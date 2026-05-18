"""SSL-verification bypass for sample/dev environments with broken CA chains.

Import this FIRST in entrypoints (app.py, rag/ingest.py, eval.py) so the patch
is applied before any HTTP client is constructed. Activated by env var
SSL_VERIFY=false (default: false). Set SSL_VERIFY=true in production.
"""
import os

_VERIFY = os.getenv("SSL_VERIFY", "false").lower() == "true"

if not _VERIFY:
    import certifi
    ca = certifi.where()
    os.environ.setdefault("SSL_CERT_FILE", ca)
    os.environ.setdefault("REQUESTS_CA_BUNDLE", ca)

    try:
        import httpx
        _orig_client = httpx.Client.__init__
        _orig_async = httpx.AsyncClient.__init__

        def _patched_client(self, *a, **kw):
            kw["verify"] = False
            return _orig_client(self, *a, **kw)

        def _patched_async(self, *a, **kw):
            kw["verify"] = False
            return _orig_async(self, *a, **kw)

        httpx.Client.__init__ = _patched_client
        httpx.AsyncClient.__init__ = _patched_async
    except ImportError:
        pass

    try:
        import urllib3
        urllib3.disable_warnings()
    except ImportError:
        pass

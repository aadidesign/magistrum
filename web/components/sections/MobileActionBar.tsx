import { Phone, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { business } from "@/lib/business";

export function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-surface-elevated/95 backdrop-blur shadow-[0_-4px_12px_rgba(15,23,42,0.06)] safe-bottom">
      <div className="grid grid-cols-3 gap-1 px-2 pt-2">
        <a href={business.phone.primary.tel} className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-navy-800 hover:bg-navy-50 active:bg-navy-100 transition-colors cursor-pointer min-h-[48px]">
          <Phone size={20} aria-hidden />
          <span className="text-[11px] sm:text-xs font-medium">Call</span>
        </a>
        <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-[#25D366] hover:bg-emerald-50 active:bg-emerald-100 transition-colors cursor-pointer min-h-[48px]">
          <MessageCircle size={20} aria-hidden />
          <span className="text-[11px] sm:text-xs font-medium">WhatsApp</span>
        </a>
        <Link href="/contact" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-gold-700 bg-gold-100 hover:bg-gold-200 active:bg-gold-300 transition-colors cursor-pointer min-h-[48px]">
          <Calendar size={20} aria-hidden />
          <span className="text-[11px] sm:text-xs font-medium">Book</span>
        </Link>
      </div>
    </div>
  );
}

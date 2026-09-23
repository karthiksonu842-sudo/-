import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Generate dynamic WhatsApp order message
  const generateWhatsAppUrl = () => {
    let message = `Hello Sai Datta Restaurant, I would like to order:\n`;
    items.forEach((item) => {
      const sizeStr = item.sizeLabel ? ` (${item.sizeLabel})` : '';
      message += `• ${item.name}${sizeStr} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal Estimated Amount: ₹${totalAmount}\n`;
    message += `(Order placed from Sai Datta website demo. Please confirm availability and preparation time.)`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_INFO.phoneRaw.replace(/\+/g, '')}?text=${encoded}`;
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer"
        className="w-full max-w-md bg-[#2B0709] border-l border-[#F4C928]/30 h-full flex flex-col justify-between shadow-2xl text-white animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#F4C928]/25 flex items-center justify-between bg-[#380b0e]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#4A0F12] border border-[#F4C928]/40 text-[#F4C928]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">Your Order</h3>
              <span className="text-xs text-[#F4C928]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            id="cart-close-btn"
            aria-label="Close cart"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#4A0F12] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F4C928]/15">
          {items.length === 0 ? (
            /* Empty State */
            <div id="cart-empty-state" className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#380b0e] border border-[#F4C928]/30 flex items-center justify-center text-neutral-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#FFF4D6] mb-1">
                Your order is empty
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs mb-6">
                Explore our menu to add aromatic biryanis, crispy starters, and rich curries.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#F4C928] text-[#2B0709] text-xs font-bold tracking-wider hover:bg-[#E5B81B] transition-colors"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <span className="text-xs font-semibold uppercase text-[#F4C928] tracking-wider">
                  SELECTED DISHES
                </span>
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-neutral-400 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.type === 'veg'
                            ? 'bg-emerald-500'
                            : item.type === 'non-veg'
                            ? 'bg-red-500'
                            : 'bg-amber-400'
                        }`}
                      />
                      <h5 className="text-sm font-semibold text-white truncate">{item.name}</h5>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                      <span>₹{item.price} each</span>
                      {item.sizeLabel && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#4A0F12] text-amber-200">
                          {item.sizeLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-[#240507] border border-[#F4C928]/30 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#FFF4D6]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 text-[#F4C928] hover:text-white rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total for item & Delete */}
                  <div className="text-right">
                    <span className="text-sm font-serif font-bold text-white block">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#F4C928]/25 bg-[#380b0e] space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between pb-2 border-b border-[#F4C928]/15">
              <span className="text-xs uppercase tracking-wider text-neutral-300">
                Order Subtotal:
              </span>
              <span className="text-2xl font-serif font-bold text-[#F4C928]">
                ₹{totalAmount}
              </span>
            </div>

            {/* Preparation time & policy notice */}
            <div className="text-[11px] text-neutral-400 bg-[#240507] p-2.5 rounded-lg border border-[#F4C928]/20 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#F4C928] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-300">
                  {RESTAURANT_INFO.orderTimeNotice}
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Online ordering will be available soon. You can order instantly by Phone or send your selection to WhatsApp.
                </p>
              </div>
            </div>

            {/* Call to Order Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              id="cart-call-to-order-btn"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] font-bold text-xs sm:text-sm tracking-wider hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>CALL TO ORDER NOW ({RESTAURANT_INFO.phone})</span>
            </a>

            {/* Dynamic WhatsApp Order Button */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="cart-whatsapp-order-btn"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>SEND ORDER VIA WHATSAPP</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

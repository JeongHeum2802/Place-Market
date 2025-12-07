import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, PlusCircle, X } from 'lucide-react';

/**
 * [Component 1] 상품 추가 모달 (Dialog)
 * - 이름과 가격을 입력받아 상위 컴포넌트로 전달합니다.
 */
const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return; // 간단한 유효성 검사

    // 상위 컴포넌트로 데이터 전달
    onAdd({ 
      name, 
      price: parseInt(price, 10), 
      quantity: 0 // 초기 수량은 0으로 시작
    });
    
    // 입력창 초기화
    setName('');
    setPrice('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black mb-6">NEW ITEM</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 에티오피아 원두"
              className="border-b-2 border-gray-200 py-2 focus:border-black outline-none transition-colors text-lg font-medium placeholder-gray-300"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Price (KRW)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="예: 15000"
              className="border-b-2 border-gray-200 py-2 focus:border-black outline-none transition-colors text-lg font-medium placeholder-gray-300"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-black transition-colors"
            >
              취소
            </button>
            <button 
              type="submit" 
              disabled={!name || !price}
              className="bg-black text-white px-8 py-3 text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * [Component 2] 재고 목록 테이블
 * - 리스트 렌더링 및 개별 항목 제어
 */
const InventoryTable = ({ items, onUpdateQuantity, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black">
            <th className="py-4 pl-2 text-xs font-black uppercase tracking-widest text-gray-500 w-1/2">Item Name</th>
            <th className="py-4 text-xs font-black uppercase tracking-widest text-gray-500 text-right w-1/6">Price</th>
            <th className="py-4 text-xs font-black uppercase tracking-widest text-gray-500 text-center w-1/4">Quantity</th>
            <th className="py-4 pr-2 text-xs font-black uppercase tracking-widest text-gray-500 text-right w-1/12">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                <td className="py-6 pl-2">
                  <div className="font-bold text-lg text-black">{item.name}</div>
                </td>
                <td className="py-6 text-right font-mono text-sm font-medium">
                  ₩ {item.price.toLocaleString()}
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all rounded-full"
                    >
                      <Minus size={14} />
                    </button>
                    <input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, 0, parseInt(e.target.value))}
                      className="w-16 text-center font-bold text-lg bg-transparent border-b border-transparent hover:border-gray-300 focus:border-black outline-none transition-colors appearance-none m-0"
                    />
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all rounded-full"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="py-6 pr-2 text-right">
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="text-gray-300 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-12 text-center text-gray-400 font-medium">
                등록된 상품이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * [Component 3] 메인 페이지
 * - 전체 상태 관리 및 레이아웃
 */
const Inventory = () => {
  const [items, setItems] = useState([
    { id: 1, name: '에티오피아 원두 (1kg)', price: 45000, quantity: 12 },
    { id: 2, name: '무항생제 우유 (1L)', price: 3500, quantity: 24 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로직: 수량 변경 (버튼 클릭 or 직접 입력)
  const handleUpdateQuantity = (id, delta, directValue = null) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = directValue !== null ? directValue : item.quantity + delta;
        return { ...item, quantity: newQty < 0 ? 0 : newQty };
      }
      return item;
    }));
  };

  // 로직: 상품 삭제
  const handleDelete = (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // 로직: 새 상품 추가
  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(), // 고유 ID 생성 (실무에선 DB ID 사용)
    };
    setItems(prev => [...prev, itemWithId]);
    setIsModalOpen(false); // 모달 닫기
  };

  // 로직: 검색 필터
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans">
      
      {/* Header Area */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">INVENTORY</h1>
          <p className="text-sm text-gray-500 font-medium">재고 관리 시스템</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-0 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="품목명 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-4 py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder-gray-300 text-sm font-medium"
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-sm font-bold hover:bg-gray-800 transition-colors whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">상품 등록</span>
          </button>
        </div>
      </header>

      {/* Main Table Area */}
      <InventoryTable 
        items={filteredItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onDelete={handleDelete}
      />

      {/* Modal Component */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddItem} 
      />
      
    </div>
  );
};

export default Inventory;
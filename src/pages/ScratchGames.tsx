import React, { useState, useEffect, useRef } from 'react';
import { ScratchText, Smile, Frown, Ticket, Coins, Lock } from 'lucide-react';

interface ScratchCard {
  id: string;
  price: number;
  prizePool: number[];
  winningZones: { x: number; y: number; radius: number; prize: number }[];
  scratchPercentage: number;
  image: string;
}

const SCRATCH_CARDS: ScratchCard[] = [
  {
    id: '1',
    price: 2,
    prizePool: [2, 5, 10, 20, 50],
    winningZones: [
      { x: 30, y: 50, radius: 20, prize: 5 },
      { x: 70, y: 80, radius: 25, prize: 10 }
    ],
    scratchPercentage: 40,
    image: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)'
  },
  {
    id: '2',
    price: 5,
    prizePool: [5, 10, 20, 50, 100],
    winningZones: [
      { x: 50, y: 50, radius: 30, prize: 20 },
      { x: 20, y: 70, radius: 15, prize: 50 }
    ],
    scratchPercentage: 35,
    image: 'linear-gradient(45deg, #4ecdc4, #88dac8)'
  },
  {
    id: '3',
    price: 10,
    prizePool: [10, 20, 50, 100, 200],
    winningZones: [
      { x: 60, y: 30, radius: 25, prize: 100 },
      { x: 40, y: 60, radius: 20, prize: 50 }
    ],
    scratchPercentage: 30,
    image: 'linear-gradient(45deg, #ff9a44, #ffc845)'
  }
];

export const ScratchGames = () => {
  const [selectedCard, setSelectedCard] = useState<ScratchCard | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [result, setResult] = useState<{ won: boolean; amount?: number } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [purchasedCards, setPurchasedCards] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedCard && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctxRef.current = ctx;
        // Dessiner la couche de masquage
        ctx.fillStyle = '#666';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-out';
      }
    }
  }, [selectedCard]);

  const handleAuth = (email: string, password: string) => {
    // Simulation d'authentification
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const purchaseCard = (card: ScratchCard) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setPurchasedCards([...purchasedCards, card.id]);
    setSelectedCard(card);
    setResult(null);
  };

  const startScratching = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      positionRef.current = {
        x: ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left,
        y: ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top
      };
    }
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || !ctxRef.current || !selectedCard) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratchResult(x, y);
  };

  const checkScratchResult = (x: number, y: number) => {
    if (!selectedCard) return;

    const winningZone = selectedCard.winningZones.find(zone => {
      const dx = x - zone.x;
      const dy = y - zone.y;
      return Math.sqrt(dx * dx + dy * dy) < zone.radius;
    });

    if (winningZone && !result) {
      setResult({ won: true, amount: winningZone.prize });
    }
  };

  const calculateScratchedPercentage = () => {
    if (!canvasRef.current || !ctxRef.current) return 0;

    const ctx = ctxRef.current;
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    return (transparentCount / (pixels.length / 4)) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* Modal de connexion */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Connexion requise
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAuth(
                formData.get('email') as string,
                formData.get('password') as string
              );
            }}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                className="w-full mb-6 p-2 border rounded"
                required
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        {/* <ScratchText className="w-8 h-8" /> */}
        Jeux de Grattage
      </h2>

      {/* Sélection de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {SCRATCH_CARDS.map((card) => (
          <div 
            key={card.id}
            className={`relative p-6 rounded-xl text-white transition-transform ${
              purchasedCards.includes(card.id) ? 'opacity-50' : 'hover:scale-105'
            }`}
            style={{ background: card.image }}
          >
            <div className="absolute top-2 right-2 bg-white/20 p-2 rounded-full">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold mb-2">{card.price}€</h3>
            <p className="text-sm mb-4">Gains possibles: {card.prizePool.join('€, ')}€</p>
            <button
              onClick={() => purchaseCard(card)}
              disabled={purchasedCards.includes(card.id)}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {purchasedCards.includes(card.id) ? 'Acheté' : 'Acheter'}
            </button>
          </div>
        ))}
      </div>

      {/* Zone de grattage */}
      {selectedCard && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="relative mb-4">
            <canvas
              ref={canvasRef}
              width="400"
              height="250"
              className="w-full h-64 rounded-lg border-2 border-gray-200 touch-none"
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={() => setIsScratching(false)}
              onMouseLeave={() => setIsScratching(false)}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={() => setIsScratching(false)}
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-gray-500">
              <Coins className="w-16 h-16 opacity-50" />
            </div>
          </div>

          {/* Résultats */}
          {result && (
            <div className={`p-4 rounded-lg ${
              result.won ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center gap-2 text-lg font-bold">
                {result.won ? (
                  <>
                    <Smile className="w-6 h-6" />
                    Félicitations ! Vous avez gagné {result.amount}€ !
                  </>
                ) : (
                  <>
                    <Frown className="w-6 h-6" />
                    Dommage... Essayez encore !
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => setSelectedCard(null)}
            className="mt-4 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg transition-colors"
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
};
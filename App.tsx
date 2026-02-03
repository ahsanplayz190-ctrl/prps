
import React, { useState, useEffect } from 'react';
import { ProposalStage } from './types';
import { QUESTIONS, NO_MESSAGES, PROPOSAL_IMAGE, SUCCESS_IMAGE } from './constants';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [stage, setStage] = useState<ProposalStage>(ProposalStage.INTRO);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [yesButtonScale, setYesButtonScale] = useState(1);

  const handleYes = () => {
    if (stage === ProposalStage.INTRO) {
      setStage(ProposalStage.QUESTIONS);
    } else if (stage === ProposalStage.QUESTIONS) {
      if (currentQuestionIdx < QUESTIONS.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setNoCount(0);
        setYesButtonScale(1);
      } else {
        setStage(ProposalStage.PROPOSAL);
        setNoCount(0);
        setYesButtonScale(1);
      }
    } else if (stage === ProposalStage.PROPOSAL) {
      setStage(ProposalStage.SUCCESS);
    }
  };

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    setYesButtonScale(prev => prev + 0.2);
    
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    
    if (noCount > 2 || stage === ProposalStage.PROPOSAL) {
      setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }
  };

  useEffect(() => {
    setNoButtonPos({ top: 'auto', left: 'auto' });
  }, [currentQuestionIdx, stage]);

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl bg-white flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=400&auto=format&fit=crop" 
          alt="Chat bubbles" 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-romantic text-pink-600 mb-6 drop-shadow-sm px-4 leading-tight">
        It all started with a simple text message... 📩
      </h1>
      <p className="text-lg md:text-xl text-pink-500 mb-8 max-w-md px-6">
        Every "typing..." and every notification from you is the highlight of my day. I have something special to ask.
      </p>
      <button
        onClick={handleYes}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full text-xl shadow-xl transition-all transform hover:scale-110 active:scale-95"
      >
        Read Message ❤️
      </button>
    </div>
  );

  const renderQuestions = () => {
    const q = QUESTIONS[currentQuestionIdx];
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in slide-in-from-right duration-500">
        <div className="w-48 h-48 md:w-64 md:h-64 mb-8 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
          <img 
            src={q.imageUrl} 
            alt="Sweet moment" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10 max-w-lg leading-snug px-4">
          {q.text}
        </h2>
        <div className="flex flex-wrap gap-6 justify-center items-center w-full relative h-32">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesButtonScale})` }}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-10 rounded-full text-xl shadow-xl transition-all z-10"
          >
            Yes! 😍
          </button>
          <button
            onClick={handleNoClick}
            onMouseEnter={noCount > 5 ? handleNoClick : undefined}
            style={{ 
              position: noButtonPos.top === 'auto' ? 'relative' : 'fixed',
              top: noButtonPos.top,
              left: noButtonPos.left,
              transition: 'all 0.2s ease-out'
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-10 rounded-full text-xl shadow-md z-20 whitespace-nowrap"
          >
            {noCount === 0 ? "No" : NO_MESSAGES[Math.min(noCount - 1, NO_MESSAGES.length - 1)]}
          </button>
        </div>
        <p className="mt-8 text-pink-300 font-medium">Text {currentQuestionIdx + 1} of {QUESTIONS.length}</p>
      </div>
    );
  };

  const renderProposal = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-1000">
      <div className="w-56 h-56 md:w-72 md:h-72 mb-8 rounded-full overflow-hidden border-8 border-white shadow-2xl">
        <img 
          src={PROPOSAL_IMAGE} 
          alt="Final question" 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-romantic text-pink-600 mb-8 drop-shadow-md px-4 leading-tight">
        Will you be my forever person?
      </h1>
      <p className="text-xl md:text-2xl text-pink-500 mb-12 max-w-xl italic px-6">
        "I don't need to hear your voice or see your face to know you're the one. I feel you in every word you write."
      </p>
      
      <div className="flex flex-wrap gap-8 justify-center items-center w-full min-h-[200px] relative">
        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesButtonScale})` }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-2xl transition-all transform hover:scale-110 active:scale-95 z-30"
        >
          YES! SENDING LOVE... 💍
        </button>
        
        <button
          onClick={handleNoClick}
          onMouseEnter={handleNoClick}
          style={{ 
            position: noButtonPos.top === 'auto' ? 'relative' : 'fixed',
            top: noButtonPos.top,
            left: noButtonPos.left,
            transition: 'all 0.1s ease-out',
            opacity: Math.max(0.2, 1 - noCount * 0.05)
          }}
          className="bg-gray-200 text-gray-400 font-bold py-2 px-6 rounded-full text-lg shadow-inner z-40"
        >
          {noCount === 0 ? "No" : "Wait!"}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
      <div className="w-64 h-64 md:w-80 md:h-80 mb-8 rounded-2xl overflow-hidden border-4 border-pink-400 shadow-2xl">
        <img 
          src={SUCCESS_IMAGE} 
          alt="Us one day" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-pink-100 max-w-2xl mx-4">
        <div className="mb-4 inline-block bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full animate-pulse">
          Me is typing...
        </div>
        <h1 className="text-5xl md:text-6xl font-romantic text-pink-600 mb-6">
          Sent with Love! 🎉
        </h1>
        <p className="text-2xl text-pink-500 mb-8 px-4">
          From 'Hey' to 'Forever' through a screen. You're my favorite notification, always! ❤️
        </p>
        <div className="space-y-4 text-pink-600 font-semibold text-lg text-left">
          <p className="bg-pink-50 py-3 px-6 rounded-xl flex items-center justify-between">
            <span>Status: Connected</span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          </p>
          <p className="bg-pink-50 py-3 px-6 rounded-xl">📍 Location: In our hearts</p>
          <p className="bg-pink-50 py-3 px-6 rounded-xl">💬 Chats: To be continued...</p>
        </div>
        <p className="mt-10 text-pink-400 italic">I love you more than all the words I've ever typed.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-[#fff5f7] via-[#fff0f3] to-[#ffe4e9]">
      <FloatingHearts />
      <div className="z-10 w-full max-w-4xl mx-auto py-12">
        {stage === ProposalStage.INTRO && renderIntro()}
        {stage === ProposalStage.QUESTIONS && renderQuestions()}
        {stage === ProposalStage.PROPOSAL && renderProposal()}
        {stage === ProposalStage.SUCCESS && renderSuccess()}
      </div>
      
      <div className="fixed top-0 left-0 p-4 opacity-20 select-none pointer-events-none text-2xl">⌨️</div>
      <div className="fixed top-0 right-0 p-4 opacity-20 select-none pointer-events-none text-2xl">📱</div>
      <div className="fixed bottom-0 left-0 p-4 opacity-20 select-none pointer-events-none text-2xl">💬</div>
      <div className="fixed bottom-0 right-0 p-4 opacity-20 select-none pointer-events-none text-2xl">💖</div>
    </div>
  );
};

export default App;

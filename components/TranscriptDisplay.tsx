import React, { useEffect, useRef } from 'react';
import { ConversationEntry, MessageSender } from '../types';

interface TranscriptDisplayProps {
  history: ConversationEntry[];
  currentInput: string;
  currentOutput: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ history, currentInput, currentOutput }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, currentInput, currentOutput]);

  const renderGroundingLinks = (groundingLinks: ConversationEntry['groundingLinks']) => {
    if (!groundingLinks || groundingLinks.length === 0) return null;

    return (
      <div className="mt-2 text-sm text-gray-700">
        <p className="font-semibold">Sources:</p>
        <ul className="list-disc list-inside space-y-1">
          {groundingLinks.map((link, index) => (
            <React.Fragment key={index}>
              {link.web && (
                <li>
                  <a
                    href={link.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.web.title || link.web.uri}
                  </a>
                </li>
              )}
              {link.maps && (
                <li>
                  <a
                    href={link.maps.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {link.maps.title || link.maps.uri} (Maps)
                  </a>
                  {link.maps.placeAnswerSources && link.maps.placeAnswerSources.map((source, idx) => (
                    source.reviewSnippets?.map((snippet, sIdx) => (
                      snippet.uri && (
                        <span key={`${idx}-${sIdx}`} className="ml-2">
                          (<a
                            href={snippet.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >Review</a>)
                        </span>
                      )
                    ))
                  ))}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-250px)]">
      {history.length === 0 && !currentInput && !currentOutput && (
        <p className="text-center text-gray-500 text-lg sm:text-xl p-4">
          Start the conversation! What can I help you with today?
        </p>
      )}

      {history.map((entry) => (
        <div
          key={entry.id}
          className={`flex ${entry.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-xl shadow-md text-lg sm:text-xl ${
              entry.sender === MessageSender.USER
                ? 'bg-blue-100 text-gray-800 rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
          >
            <p className="font-semibold text-gray-700">{entry.sender === MessageSender.USER ? 'You:' : 'Assistant:'}</p>
            <p>{entry.text}</p>
            {entry.groundingLinks && renderGroundingLinks(entry.groundingLinks)}
            <p className="text-xs text-gray-500 mt-1 text-right">{entry.timestamp}</p>
          </div>
        </div>
      ))}

      {currentInput && (
        <div className="flex justify-end">
          <div className="max-w-[70%] p-3 rounded-xl shadow-md text-lg sm:text-xl bg-blue-50 text-gray-700 rounded-br-none italic">
            <p className="font-semibold text-gray-600">You (listening):</p>
            <p>{currentInput}...</p>
          </div>
        </div>
      )}

      {currentOutput && (
        <div className="flex justify-start">
          <div className="max-w-[70%] p-3 rounded-xl shadow-md text-lg sm:text-xl bg-gray-50 text-gray-700 rounded-bl-none italic">
            <p className="font-semibold text-gray-600">Assistant (speaking):</p>
            <p>{currentOutput}...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default TranscriptDisplay;

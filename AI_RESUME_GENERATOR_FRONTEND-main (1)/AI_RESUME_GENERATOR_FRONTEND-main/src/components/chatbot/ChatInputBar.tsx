import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputBarProps {
  placeholder: string;
  inputType: string;
  onSend: (value: string) => void;
  onSkip?: () => void;
  showSkip?: boolean;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  placeholder,
  inputType,
  onSend,
  onSkip,
  showSkip,
}) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && inputType !== 'textarea' && inputType !== 'multiline') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 bg-white sticky bottom-0">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          {inputType === 'textarea' || inputType === 'multiline' ? (
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="min-h-[80px] resize-none"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
              onKeyDown={handleKeyDown}
              type={inputType === 'confirm' ? 'text' : inputType}
            />
          )}
          
          <Button 
            onClick={handleSend} 
            disabled={!value.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0 rounded-full flex-shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
        
        {showSkip && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-slate-500 text-xs w-fit h-auto p-1 hover:bg-transparent hover:text-slate-800"
          >
            Type 'skip' or click here to skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatInputBar;

import React from 'react';
import { AnnotatedImage } from './AnnotatedImage';
import { EQUIPMENT_IMAGES, getAnnotations } from '../services/equipmentImages';

interface MessageRendererProps {
  text: string;
}

// Regex to match equipment image tags: [EQUIPMENT:equipment-id:annotationType]
// annotationType can be: statusLights, resetButton, ports, or all
const EQUIPMENT_TAG_REGEX = /\[EQUIPMENT:([a-z0-9-]+):?(statusLights|resetButton|ports|all)?\]/gi;

export const MessageRenderer: React.FC<MessageRendererProps> = ({ text }) => {
  // Split text by equipment tags
  const parts: (string | { equipmentId: string; annotationType: string })[] = [];
  let lastIndex = 0;
  let match;

  const regex = new RegExp(EQUIPMENT_TAG_REGEX);

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add equipment reference
    parts.push({
      equipmentId: match[1],
      annotationType: match[2] || 'all'
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no equipment tags found, just render the text
  if (parts.length === 1 && typeof parts[0] === 'string') {
    return <p className="text-[16px] leading-relaxed font-medium whitespace-pre-wrap">{text}</p>;
  }

  return (
    <div>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return (
            <p key={index} className="text-[16px] leading-relaxed font-medium whitespace-pre-wrap">
              {part}
            </p>
          );
        }

        // Render equipment image
        const equipment = EQUIPMENT_IMAGES[part.equipmentId];
        if (!equipment) {
          return (
            <p key={index} className="text-sm text-slate-400 italic">
              [Equipment image not found: {part.equipmentId}]
            </p>
          );
        }

        const annotations = getAnnotations(
          part.equipmentId,
          part.annotationType as 'statusLights' | 'resetButton' | 'ports' | 'all'
        );

        return (
          <AnnotatedImage
            key={index}
            src={equipment.imageUrl}
            alt={equipment.name}
            annotations={annotations}
            caption={equipment.caption}
          />
        );
      })}
    </div>
  );
};

export default MessageRenderer;

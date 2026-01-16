import React from 'react';

export interface Annotation {
  type: 'circle' | 'arrow' | 'label';
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  label?: string;
  color?: string;
  // For arrows
  toX?: number;
  toY?: number;
}

export interface EquipmentImageProps {
  src: string;
  alt: string;
  annotations: Annotation[];
  caption?: string;
}

export const AnnotatedImage: React.FC<EquipmentImageProps> = ({
  src,
  alt,
  annotations,
  caption
}) => {
  const defaultColor = '#00B4A0'; // sv-teal

  return (
    <div className="my-4">
      <div className="relative inline-block w-full max-w-md mx-auto">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-xl border-2 border-slate-200 shadow-lg"
        />
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {annotations.map((annotation, index) => {
            const color = annotation.color || defaultColor;

            if (annotation.type === 'circle') {
              return (
                <g key={index}>
                  {/* Pulsing outer circle */}
                  <circle
                    cx={annotation.x}
                    cy={annotation.y}
                    r="6"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity="0.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${annotation.x}% ${annotation.y}%` }}
                  />
                  {/* Main circle */}
                  <circle
                    cx={annotation.x}
                    cy={annotation.y}
                    r="4"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                  />
                  {/* Label if provided */}
                  {annotation.label && (
                    <>
                      <rect
                        x={annotation.x + 5}
                        y={annotation.y - 3}
                        width={annotation.label.length * 2.5 + 2}
                        height="6"
                        fill="rgba(0,0,0,0.75)"
                        rx="1"
                      />
                      <text
                        x={annotation.x + 6}
                        y={annotation.y + 1}
                        fill="white"
                        fontSize="3"
                        fontWeight="bold"
                      >
                        {annotation.label}
                      </text>
                    </>
                  )}
                </g>
              );
            }

            if (annotation.type === 'arrow' && annotation.toX !== undefined && annotation.toY !== undefined) {
              const dx = annotation.toX - annotation.x;
              const dy = annotation.toY - annotation.y;
              const angle = Math.atan2(dy, dx) * 180 / Math.PI;

              return (
                <g key={index}>
                  {/* Arrow line */}
                  <line
                    x1={annotation.x}
                    y1={annotation.y}
                    x2={annotation.toX}
                    y2={annotation.toY}
                    stroke={color}
                    strokeWidth="1"
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${annotation.toX},${annotation.toY} ${annotation.toX - 3},${annotation.toY - 1.5} ${annotation.toX - 3},${annotation.toY + 1.5}`}
                    fill={color}
                    transform={`rotate(${angle}, ${annotation.toX}, ${annotation.toY})`}
                  />
                  {/* Label if provided */}
                  {annotation.label && (
                    <>
                      <rect
                        x={annotation.x - annotation.label.length * 1.25 - 1}
                        y={annotation.y - 4}
                        width={annotation.label.length * 2.5 + 2}
                        height="6"
                        fill="rgba(0,0,0,0.75)"
                        rx="1"
                      />
                      <text
                        x={annotation.x - annotation.label.length * 1.25}
                        y={annotation.y}
                        fill="white"
                        fontSize="3"
                        fontWeight="bold"
                      >
                        {annotation.label}
                      </text>
                    </>
                  )}
                </g>
              );
            }

            if (annotation.type === 'label') {
              return (
                <g key={index}>
                  <rect
                    x={annotation.x - (annotation.label?.length || 0) * 1.25}
                    y={annotation.y - 3}
                    width={(annotation.label?.length || 0) * 2.5 + 2}
                    height="6"
                    fill="rgba(0,0,0,0.85)"
                    rx="1"
                  />
                  <text
                    x={annotation.x - (annotation.label?.length || 0) * 1.25 + 1}
                    y={annotation.y + 1}
                    fill={color}
                    fontSize="3"
                    fontWeight="bold"
                  >
                    {annotation.label}
                  </text>
                </g>
              );
            }

            return null;
          })}
        </svg>
      </div>
      {caption && (
        <p className="text-center text-sm text-slate-500 mt-2 font-medium">{caption}</p>
      )}
    </div>
  );
};

export default AnnotatedImage;

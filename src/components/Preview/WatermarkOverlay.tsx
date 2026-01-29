import React from 'react';

export const WatermarkOverlay: React.FC = () => {
    return (
        <div className="watermark-overlay">
            {Array.from({ length: 20 }).map((_, rowIndex) => (
                <div key={rowIndex} className="watermark-row">
                    {Array.from({ length: 10 }).map((_, colIndex) => (
                        <div key={colIndex} className="watermark-item">
                            PREVIEW - DO NOT COPY
                        </div>
                    ))}
                </div>
            ))}
            <style>{`
                .watermark-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow: hidden;
                    opacity: 0.15;
                }
                .watermark-row {
                    display: flex;
                    justify-content: space-around;
                    white-space: nowrap;
                }
                .watermark-item {
                    transform: rotate(-30deg);
                    font-size: 24px;
                    font-weight: bold;
                    color: #000;
                    padding: 20px;
                    user-select: none;
                }
            `}</style>
        </div>
    );
};

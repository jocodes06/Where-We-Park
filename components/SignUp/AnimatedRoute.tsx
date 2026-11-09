export default function AnimatedRoute() {
    return (
        <div className="visual-side">
            <style>{`
                .visual-side {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 1000px;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                    padding: 40px;
                    background: #1E5B43;
                    border-radius: 24px;
                }

                .visual-side::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(
                            320px 220px at 80% 18%,
                            rgba(245, 183, 57, 0.55),
                            transparent 70%
                        ),
                        radial-gradient(
                            360px 260px at 15% 75%,
                            rgba(207, 232, 236, 0.4),
                            transparent 70%
                        );
                }

                .route-svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                /* THE ACTUAL MOVING ROUTE */
                .route-line {
                    fill: none;
                    stroke: rgba(255, 255, 255, 0.4);
                    stroke-width: 3;
                    stroke-linecap: round;

                    stroke-dasharray: 2 12;
                    stroke-dashoffset: 0;

                    animation: routeMove 4s linear infinite;
                }

                @keyframes routeMove {
                    from {
                        stroke-dashoffset: 0;
                    }

                    to {
                        stroke-dashoffset: -140;
                    }
                }

                /* DOTS */
                .route-dot {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: dotPop 0.5s ease-out both;
                }

                .route-dot:nth-of-type(1) {
                    animation-delay: 0.1s;
                }

                .route-dot:nth-of-type(2) {
                    animation-delay: 0.35s;
                }

                .route-dot:nth-of-type(3) {
                    animation-delay: 0.6s;
                }

                .route-dot:nth-of-type(4) {
                    animation-delay: 0.85s;
                }

                @keyframes dotPop {
                    from {
                        opacity: 0;
                        transform: scale(0);
                    }

                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

              
                .route-text {
                    position: relative;
                    z-index: 2;
                    color: var( --dark-green);
                    animation: textRise 0.6s ease-out 0.2s both;
                    
                }

                .route-text > p{
                 color: var( --dark-green);
                }
                
                .route-text > h2{
                width:80%;
                }

                @keyframes textRise {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .route-line,
                    .route-dot,
                    .route-text {
                        animation: none;
                    }
                }

                @media (max-width: 1200px){
    .visual-side{
        min-height: 400px;;
    }
}

@media (max-width: 780px) {
    .visual-side {
        min-height: 400px
    }

            `}</style>

            <svg className="route-svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
                aria-hidden="true">
                <path className="route-line" d="M60 700
                       C160 620 140 520 240 470
                       C340 420 320 320 420 260
                       C480 224 500 170 560 90"/>
                <circle className="route-dot" cx="60" cy="700" r="9" fill="#F5B739" />
                <circle
                    className="route-dot"
                    cx="240"
                    cy="470"
                    r="9"
                    fill="#F5B739"
                />

                <circle
                    className="route-dot"
                    cx="420"
                    cy="260"
                    r="9"
                    fill="#F5B739"
                />

                <circle
                    className="route-dot"
                    cx="560"
                    cy="90"
                    r="9"
                    fill="#F5B739"
                />
            </svg>

            <div className="route-text">
                <h2>
                    Park smarter, starting today.</h2>
                <p>
                    One account for finding spots and listing your own.</p>
            </div>
        </div>
    );
}
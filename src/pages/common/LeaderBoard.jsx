import React, { useState, useMemo, useEffect } from "react";
import { Trophy, Search, Award, Medal, Crown, Zap, X, Flame, Users, Grid3x3, List } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Badge } from "../../components/Badge";
import leaderboardData from "../../data/leaderboardData.json";

// Global animation styles
const animationStyles = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(252, 211, 77, 0.4), inset 0 0 20px rgba(252, 211, 77, 0.1);
    }
    50% {
      box-shadow: 0 0 25px rgba(252, 211, 77, 0.8), inset 0 0 30px rgba(252, 211, 77, 0.2);
    }
  }

  @keyframes glowSilver {
    0%, 100% {
      box-shadow: 0 0 10px rgba(203, 213, 225, 0.4), inset 0 0 20px rgba(203, 213, 225, 0.1);
    }
    50% {
      box-shadow: 0 0 25px rgba(203, 213, 225, 0.8), inset 0 0 30px rgba(203, 213, 225, 0.2);
    }
  }

  @keyframes glowBronze {
    0%, 100% {
      box-shadow: 0 0 10px rgba(251, 146, 60, 0.4), inset 0 0 20px rgba(251, 146, 60, 0.1);
    }
    50% {
      box-shadow: 0 0 25px rgba(251, 146, 60, 0.8), inset 0 0 30px rgba(251, 146, 60, 0.2);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-40px) rotate(180deg);
    }
  }

  @keyframes floatLeft {
    0%, 100% {
      transform: translateX(0px) translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateX(-60px) translateY(-40px) rotate(180deg);
    }
  }

  @keyframes floatRight {
    0%, 100% {
      transform: translateX(0px) translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateX(60px) translateY(-40px) rotate(-180deg);
    }
  }

  @keyframes floatSlow {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-50px) scale(1.05);
    }
  }

  @keyframes pulse2 {
    0%, 100% {
      box-shadow: 0 0 20px rgba(82, 102, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 60px rgba(82, 102, 129, 0.8);
    }
  }

  @keyframes pulse3 {
    0%, 100% {
      box-shadow: 0 0 20px rgba(252, 211, 77, 0.4);
    }
    50% {
      box-shadow: 0 0 60px rgba(252, 211, 77, 0.8);
    }
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes cardHover {
    from {
      transform: translateY(0px) scale(1);
    }
    to {
      transform: translateY(-8px) scale(1.01);
    }
  }

  @keyframes shine {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .floating-element {
    position: fixed;
    pointer-events: none;
    z-index: 0;
  }

  .floating-element-1 {
    animation: floatSlow 8s ease-in-out infinite;
  }

  .floating-element-2 {
    animation: float 10s ease-in-out infinite;
  }

  .floating-element-3 {
    animation: floatLeft 12s ease-in-out infinite;
  }

  .floating-element-4 {
    animation: floatRight 14s ease-in-out infinite;
  }

  .floating-circle-1 {
    animation: pulse2 4s ease-in-out infinite;
  }

  .floating-circle-2 {
    animation: pulse3 5s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = animationStyles;
  document.head.appendChild(styleSheet);
}

export const LeaderBoard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sort players by points (always sorted)
  const sortedPlayers = useMemo(() => {
    return [...leaderboardData].sort((a, b) => b.totalPoints - a.totalPoints);
  }, []);

  // Get rank styling based on position
  const getRankStyles = (index) => {
    if (index === 0) {
      return {
        container: { 
          background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", 
          border: "2px solid #526681",
          boxShadow: "0 4px 12px rgba(252, 211, 77, 0.2)"
        },
        badge: { 
          background: "linear-gradient(135deg, #526681 0%, #252c35 100%)",
          color: "#78350F",
          boxShadow: "0 4px 12px rgba(252, 211, 77, 0.3)"
        },
        avatar: {
          background: "linear-gradient(135deg, #526681 0%, #252c35 100%)",
          color: "#78350F"
        }
      };
    }
    if (index === 1) {
      return {
        container: { 
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)", 
          border: "2px solid #CBD5E1",
          boxShadow: "0 4px 12px rgba(203, 213, 225, 0.2)"
        },
        badge: { 
          background: "linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)",
          color: "#1F2937",
          boxShadow: "0 4px 12px rgba(209, 213, 219, 0.3)"
        },
        avatar: {
          background: "linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)",
          color: "#1F2937"
        }
      };
    }
    if (index === 2) {
      return {
        container: { 
          background: "linear-gradient(135deg, #FFFAF0 0%, #FEE2CB 100%)", 
          border: "2px solid #FDBA74",
          boxShadow: "0 4px 12px rgba(251, 191, 36, 0.15)"
        },
        badge: { 
          background: "linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)",
          color: "white",
          boxShadow: "0 4px 12px rgba(251, 146, 60, 0.3)"
        },
        avatar: {
          background: "linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)",
          color: "white"
        }
      };
    }
    return {
      container: { backgroundColor: "white", border: "1px solid #E2E8F0" },
      badge: { backgroundColor: "#E2E8F0", color: "#1E293B" },
      avatar: { background: "linear-gradient(135deg, #252c35 0%, #526681 100%)", color: "white" }
    };
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} style={styles.star}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" style={styles.halfStar}>
          ★
        </span>
      );
    }

    return <div style={styles.ratingStarsContainer}>{stars}</div>;
  };

  return (
    <Layout>
      {/* Enhanced Floating Background Elements */}
      {/* Gradient Circle 1 - Top Left */}
      <div 
        className="floating-element floating-element-1"
        style={{ 
          position: "fixed",
          top: "5%", 
          left: "2%", 
          width: "500px", 
          height: "500px",
          background: "radial-gradient(circle at 30% 30%, rgba(252, 211, 77, 0.5), rgba(37, 44, 53, 0.15), transparent)",
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.6,
          zIndex: 0,
          pointerEvents: "none",
        }} 
      />

      {/* Gradient Circle 2 - Top Right */}
      <div 
        className="floating-element floating-element-2"
        style={{ 
          position: "fixed",
          top: "8%", 
          right: "3%", 
          width: "450px", 
          height: "450px",
          background: "radial-gradient(circle at 30% 30%, rgba(82, 102, 129, 0.5), rgba(37, 44, 53, 0.15), transparent)",
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.55,
          zIndex: 0,
          pointerEvents: "none",
        }} 
      />

      {/* Gradient Circle 3 - Bottom Left */}
      <div 
        className="floating-element floating-element-3"
        style={{ 
          position: "fixed",
          bottom: "2%", 
          left: "8%", 
          width: "480px", 
          height: "480px",
          background: "radial-gradient(circle at 30% 30%, rgba(82, 102, 129, 0.4), rgba(37, 44, 53, 0.12), transparent)",
          borderRadius: "50%",
          filter: "blur(65px)",
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: "none",
        }} 
      />

      {/* Gradient Circle 4 - Bottom Right */}
      <div 
        className="floating-element floating-element-4"
        style={{ 
          position: "fixed",
          bottom: "5%", 
          right: "4%", 
          width: "520px", 
          height: "520px",
          background: "radial-gradient(circle at 30% 30%, rgba(252, 211, 77, 0.45), rgba(37, 44, 53, 0.12), transparent)",
          borderRadius: "50%",
          filter: "blur(65px)",
          opacity: 0.55,
          zIndex: 0,
          pointerEvents: "none",
        }} 
      />

      {/* Pulsing Accent Circle 1 */}
      <div 
        className="floating-circle-1"
        style={{ 
          position: "fixed",
          top: "25%", 
          right: "20%", 
          width: "200px", 
          height: "200px",
          background: "radial-gradient(circle, rgba(82, 102, 129, 0.6), rgba(82, 102, 129, 0.2), transparent)",
          borderRadius: "50%",
          filter: "blur(30px)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.7,
        }} 
      />

      {/* Pulsing Accent Circle 2 */}
      <div 
        className="floating-circle-2"
        style={{ 
          position: "fixed",
          bottom: "20%", 
          left: "15%", 
          width: "220px", 
          height: "220px",
          background: "radial-gradient(circle, rgba(252, 211, 77, 0.5), rgba(252, 211, 77, 0.15), transparent)",
          borderRadius: "50%",
          filter: "blur(35px)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.65,
        }} 
      />

      {/* Extra shimmer effect - Top Center */}
      <div 
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "linear-gradient(90deg, transparent, rgba(82, 102, 129, 0.3), transparent)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.3,
          animation: "float 15s ease-in-out infinite",
        }}
      />

      <div style={{
        ...styles.pageContainer,
        animation: isLoaded ? 'fadeInDown 0.8s ease-out' : 'none',
      }}>
        {/* Hero Section with Gradient Background */}
        <div style={{
          ...styles.heroSection,
          animation: isLoaded ? 'slideInUp 0.8s ease-out' : 'none',
        }}>
          <div style={styles.heroContent}>
            <div style={styles.titleWrapper}>
              <Trophy size={48} style={{ color: "#526681" }} />
              <div>
                <h1 style={styles.mainTitle}>Leaderboard</h1>
                <p style={styles.heroSubtitle}>Track achievements and celebrate excellence</p>
              </div>
            </div>
            
            {/* View Toggle Buttons */}
            <div style={styles.viewToggleContainer}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === "grid" ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
                }}
              >
                <Grid3x3 size={18} />
                Grid View
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === "list" ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive)
                }}
              >
                <List size={18} />
                List View
              </button>
            </div>

            <Crown size={64} style={{ color: "#526681", opacity: 0.15 }} />
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div style={{
          ...styles.statsGrid,
          animation: isLoaded ? 'slideInUp 0.8s ease-out 0.1s both' : 'none',
        }}>
          <div style={{
            ...styles.statCardPrimary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 20px 50px rgba(252, 211, 77, 0.3)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = styles.statCardPrimary.boxShadow;
          }}>
            <div style={styles.statCardIconGold}>
              <Flame size={32} style={{ color: "#DC2626", animation: isLoaded ? 'pulse 2s infinite' : 'none' }} />
            </div>
            <div style={styles.statCardInfo}>
              <span style={styles.statLabel}>Top Performer</span>
              <span style={styles.statNumber}>{sortedPlayers[0]?.name || "—"}</span>
            </div>
          </div>

          <div style={{
            ...styles.statCardSecondary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 20px 50px rgba(82, 102, 129, 0.3)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = styles.statCardSecondary.boxShadow;
          }}>
            <div style={styles.statCardIconBlue}>
              <Users size={32} style={{ color: "#526681" }} />
            </div>
            <div style={styles.statCardInfo}>
              <span style={styles.statLabel}>Total Players</span>
              <span style={styles.statNumber}>{leaderboardData.length}</span>
            </div>
          </div>

          <div style={{
            ...styles.statCardTertiary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 20px 50px rgba(80, 200, 120, 0.3)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = styles.statCardTertiary.boxShadow;
          }}>
            <div style={styles.statCardIconGreen}>
              <Zap size={32} style={{ color: "#16A34A" }} />
            </div>
            <div style={styles.statCardInfo}>
              <span style={styles.statLabel}>Points Pool</span>
              <span style={styles.statNumber}>{leaderboardData.reduce((acc, p) => acc + p.totalPoints, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Container */}
        <div style={{
          ...styles.leaderboardSection,
          animation: isLoaded ? 'slideInUp 0.8s ease-out 0.2s both' : 'none',
        }}>
          {sortedPlayers.length > 0 ? (
            viewMode === "grid" ? (
              <div style={styles.cardsGrid}>
              {sortedPlayers.map((player, index) => {
                const rankStyles = getRankStyles(index);
                const isTopThree = index < 3;
                const isHovered = hoveredIndex === index;
                const animationDelay = `${0.3 + index * 0.08}s`;
                const medalIcons = [<Flame key="flame" size={24} />, <Medal key="medal1" size={24} />, <Medal key="medal2" size={24} />];

                return (
                  <div
                    key={player.id}
                    style={{
                      ...styles.playerCard,
                      ...rankStyles.container,
                      ...(isHovered && styles.playerCardHovered),
                      animation: isLoaded ? `slideInUp 0.6s ease-out ${animationDelay} both` : 'none',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Rank Badge - Positioned Absolutely */}
                    <div style={{
                      ...styles.rankBadgeContainer,
                      ...rankStyles.badge,
                      animation: isTopThree && isLoaded ? (index === 0 ? 'glow 2.5s infinite' : index === 1 ? 'glowSilver 2.5s infinite' : 'glowBronze 2.5s infinite') : 'none',
                    }}>
                      <div style={styles.rankBadgeContent}>
                        {index < 3 ? medalIcons[index] : <span style={styles.rankNumber}>{index + 1}</span>}
                      </div>
                    </div>

                    {/* Player Info - Centered */}
                    <div style={styles.playerInfoContainer}>
                      <div
                        style={{
                          ...styles.avatar,
                          ...rankStyles.avatar,
                          transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        {player.avatar}
                      </div>
                      <div style={styles.playerTextInfo}>
                        <div style={{
                          ...styles.playerName,
                          color: isHovered ? '#526681' : '#1E293B',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                        }}>
                          {player.name}
                        </div>
                        <div style={{
                          ...styles.playerLevel,
                          opacity: isHovered ? 1 : 0.7,
                          fontSize: isHovered ? '13px' : '12px',
                          transition: 'all 0.3s ease',
                        }}>
                          Level {Math.min(5, Math.floor(player.totalPoints / 1500) + 1)} • {player.sessionsCompleted} sessions
                        </div>
                      </div>
                    </div>

                    {/* Points Display - Bottom */}
                    <div style={{
                      ...styles.pointsDisplay,
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}>
                      <div style={styles.pointsLabel}>POINTS</div>
                      <div style={styles.pointsValue}>
                        {player.totalPoints.toLocaleString()}
                      </div>
                      {isHovered && <div style={styles.pointsGlow} />}
                    </div>
                  </div>
                );
              })}
            </div>
            ) : (
              <div style={styles.listViewContainer}>
                {sortedPlayers.map((player, index) => {
                  const rankStyles = getRankStyles(index);
                  const isTopThree = index < 3;
                  const medalIcons = [<Flame key="flame" size={20} />, <Medal key="medal1" size={20} />, <Medal key="medal2" size={20} />];

                  return (
                    <div
                      key={player.id}
                      style={{
                        ...styles.listViewRow,
                        ...(hoveredIndex === index ? styles.listViewRowHovered : {}),
                        animation: isLoaded ? `slideInUp 0.6s ease-out ${0.3 + index * 0.04}s both` : 'none',
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Rank Badge */}
                      <div style={{
                        ...styles.listRankBadge,
                        ...rankStyles.badge,
                        animation: isTopThree && isLoaded ? (index === 0 ? 'glow 2.5s infinite' : index === 1 ? 'glowSilver 2.5s infinite' : 'glowBronze 2.5s infinite') : 'none',
                      }}>
                        {index < 3 ? medalIcons[index] : <span style={styles.rankNumber}>{index + 1}</span>}
                      </div>

                      {/* Player Avatar */}
                      <div
                        style={{
                          ...styles.listAvatar,
                          ...rankStyles.avatar,
                          transform: hoveredIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        {player.avatar}
                      </div>

                      {/* Player Info */}
                      <div style={styles.listPlayerInfo}>
                        <div style={{
                          ...styles.listPlayerName,
                          color: hoveredIndex === index ? '#526681' : '#1E293B',
                          transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                        }}>
                          {player.name}
                        </div>
                        <div style={{
                          ...styles.listPlayerLevel,
                          opacity: hoveredIndex === index ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                        }}>
                          Level {Math.min(5, Math.floor(player.totalPoints / 1500) + 1)} • {player.sessionsCompleted} sessions
                        </div>
                      </div>

                      {/* Points */}
                      <div style={{
                        ...styles.listPointsDisplay,
                        transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                      }}>
                        <div style={styles.listPointsValue}>
                          {player.totalPoints.toLocaleString()}
                        </div>
                        <div style={styles.listPointsLabel}>points</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIconWrapper}>
                <Trophy size={48} style={styles.emptyStateIcon} />
              </div>
              <p style={styles.emptyStateText}>No players available</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeaderBoard;

const styles = {
  pageContainer: {
    padding: "40px 24px",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  // Hero Section
  heroSection: {
    background: "linear-gradient(135deg, #252c35 0%, #526681 100%)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "48px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(37, 44, 53, 0.25)",
  },

  heroContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
  },

  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1,
  },

  mainTitle: {
    fontSize: "42px",
    fontWeight: "900",
    color: "white",
    margin: "0 0 8px 0",
    letterSpacing: "-1px",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.85)",
    margin: 0,
    fontWeight: "500",
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "48px",
  },

  statCardPrimary: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "28px",
    background: "linear-gradient(135deg, rgba(37, 44, 53, 0.1) 0%, rgba(82, 102, 129, 0.05) 100%)",
    border: "2px solid #252c35",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(37, 44, 53, 0.15)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
  },

  statCardSecondary: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "28px",
    background: "linear-gradient(135deg, rgba(82, 102, 129, 0.1) 0%, rgba(37, 44, 53, 0.05) 100%)",
    border: "2px solid #526681",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(82, 102, 129, 0.15)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
  },

  statCardTertiary: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "28px",
    background: "linear-gradient(135deg, rgba(37, 44, 53, 0.08) 0%, rgba(82, 102, 129, 0.08) 100%)",
    border: "2px solid #252c35",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(37, 44, 53, 0.12)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
  },

  statCardIconGold: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(37, 44, 53, 0.2)",
    flexShrink: 0,
    animation: "bounce 2s infinite",
  },

  statCardIconBlue: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(82, 102, 129, 0.2)",
    flexShrink: 0,
    animation: "bounce 2s infinite 0.2s",
  },

  statCardIconGreen: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(37, 44, 53, 0.15)",
    flexShrink: 0,
    animation: "bounce 2s infinite 0.4s",
  },

  statCardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  statLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  statNumber: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#1E293B",
    lineHeight: 1,
  },

  // Leaderboard Section
  leaderboardSection: {
    marginBottom: "40px",
  },

  // View Toggle
  viewToggleContainer: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  viewToggleButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "2px solid",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily: "inherit",
  },

  viewToggleButtonActive: {
    backgroundColor: "white",
    color: "#252c35",
    borderColor: "white",
    boxShadow: "0 6px 20px rgba(255, 255, 255, 0.3)",
  },

  viewToggleButtonInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderColor: "white",
    opacity: 0.7,
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },

  listViewContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  listViewRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 24px",
    backgroundColor: "white",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
  },

  listViewRowHovered: {
    transform: "translateX(8px)",
    borderColor: "#526681",
    boxShadow: "0 10px 30px rgba(82, 102, 129, 0.15)",
  },

  listRankBadge: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    flexShrink: 0,
    color: "white",
  },

  listAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "800",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    border: "2px solid white",
    flexShrink: 0,
  },

  listPlayerInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  listPlayerName: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 1.2,
  },

  listPlayerLevel: {
    fontSize: "13px",
    color: "#64748B",
    fontWeight: "600",
  },

  listPointsDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
    flexShrink: 0,
  },

  listPointsValue: {
    fontSize: "20px",
    fontWeight: "900",
    color: "#252c35",
    lineHeight: 1,
  },

  listPointsLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  playerCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "32px 24px 28px 24px",
    borderRadius: "16px",
    border: "2px solid",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
    minHeight: "320px",
    justifyContent: "space-between",
  },

  playerCardHovered: {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
  },

  rankBadgeContainer: {
    position: "absolute",
    top: "-16px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid white",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },

  rankBadgeContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "900",
    color: "white",
  },

  rankNumber: {
    fontSize: "26px",
    fontWeight: "900",
  },

  playerInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    marginTop: "8px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "800",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    border: "3px solid white",
  },

  playerTextInfo: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  playerName: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 1.2,
  },

  playerLevel: {
    fontSize: "12px",
    color: "#64748B",
    fontWeight: "600",
  },

  pointsDisplay: {
    textAlign: "center",
    padding: "12px 20px",
    background: "rgba(37, 44, 53, 0.08)",
    borderRadius: "12px",
    width: "100%",
    position: "relative",
    transition: "all 0.3s ease",
  },

  pointsLabel: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#252c35",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
  },

  pointsValue: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#252c35",
    lineHeight: 1,
  },

  pointsGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(252, 211, 77, 0.4), transparent)",
    borderRadius: "12px",
    animation: "pulse 1.5s infinite",
    pointerEvents: "none",
  },

  // Empty State
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 24px",
    textAlign: "center",
  },

  emptyStateIconWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#F1F5F9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },

  emptyStateIcon: {
    width: "50px",
    height: "50px",
    color: "#CBD5E1",
  },

  emptyStateText: {
    fontSize: "18px",
    color: "#64748B",
    margin: "0 0 24px 0",
    fontWeight: "600",
  },

  resetButton: {
    padding: "12px 28px",
    backgroundColor: "#252c35",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(37, 44, 53, 0.3)",
  },
};


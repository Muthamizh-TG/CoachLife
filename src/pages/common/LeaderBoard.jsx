import React, { useState, useMemo, useEffect } from "react";
import { Trophy, Search, Award, Medal, Crown, Zap, X, Flame, Users, Grid3x3, List, TrendingUp, Flame as FireIcon, Star } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Badge } from "../../components/Badge";
import leaderboardData from "../../data/leaderboardData.json";



export const LeaderBoard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Sort players by points
  const sortedPlayers = useMemo(() => {
    return leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);
  }, []);

  // Get rank styling based on position
  const getRankStyles = (index) => {
    if (index === 0) {
      return {
        container: { 
          background: "linear-gradient(135deg, rgba(255, 243, 205, 0.6) 0%, rgba(255, 250, 230, 0.4) 100%)",
          border: "2px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 6px 20px rgba(255, 215, 0, 0.15)"
        },
        badge: { 
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.8) 0%, rgba(255, 200, 100, 0.7) 100%)",
          color: "#1E293B",
          boxShadow: "0 3px 10px rgba(255, 215, 0, 0.2)"
        },
        avatar: {
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.7) 0%, rgba(255, 200, 100, 0.6) 100%)",
          color: "#1E293B"
        }
      };
    }
    if (index === 1) {
      return {
        container: { 
          background: "linear-gradient(135deg, rgba(240, 240, 245, 0.5) 0%, rgba(248, 248, 250, 0.35) 100%)",
          border: "2px solid rgba(192, 192, 192, 0.25)",
          boxShadow: "0 6px 20px rgba(192, 192, 192, 0.12)"
        },
        badge: { 
          background: "linear-gradient(135deg, rgba(232, 232, 232, 0.8) 0%, rgba(200, 200, 200, 0.7) 100%)",
          color: "#1E293B",
          boxShadow: "0 3px 10px rgba(192, 192, 192, 0.18)"
        },
        avatar: {
          background: "linear-gradient(135deg, rgba(232, 232, 232, 0.7) 0%, rgba(200, 200, 200, 0.6) 100%)",
          color: "#1E293B"
        }
      };
    }
    if (index === 2) {
      return {
        container: { 
          background: "linear-gradient(135deg, rgba(245, 222, 179, 0.4) 0%, rgba(255, 240, 220, 0.3) 100%)",
          border: "2px solid rgba(205, 127, 50, 0.25)",
          boxShadow: "0 6px 20px rgba(205, 127, 50, 0.12)"
        },
        badge: { 
          background: "linear-gradient(135deg, rgba(205, 127, 50, 0.75) 0%, rgba(184, 100, 28, 0.65) 100%)",
          color: "#1E293B",
          boxShadow: "0 3px 10px rgba(205, 127, 50, 0.18)"
        },
        avatar: {
          background: "linear-gradient(135deg, rgba(205, 127, 50, 0.6) 0%, rgba(184, 100, 28, 0.5) 100%)",
          color: "#1E293B"
        }
      };
    }
    return {
      container: { backgroundColor: "white", border: "1px solid #E2E8F0" },
      badge: { backgroundColor: "#252c35", color: "#ffffff" },
      avatar: { background: "linear-gradient(135deg, #060030ff 0%, #000000ff 100%)", color: "white" }
    };
  };

  // Get achievement badges
  const getAchievements = (player, index) => {
    const achievements = [];
    if (index < 3) achievements.push("top3");
    if (player.sessionsCompleted >= 50) achievements.push("champion");
    if (player.averageRating >= 4.7) achievements.push("rated");
    if (player.totalPoints >= 8000) achievements.push("elite");
    return achievements;
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
      <div style={{
        padding: "32px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}>
        {/* Hero Section with Gradient Background */}
        <div style={{
          ...styles.heroSection
        }}
        data-aos="fade-up"
        data-aos-duration="800">
          <div style={styles.heroContent}>
            <div style={styles.titleWrapper}>
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
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div style={{
          ...styles.statsGrid
        }}
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800">
          <div style={{
            ...styles.statCardPrimary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(82, 102, 129, 0.1)";
            e.currentTarget.style.borderColor = "#060030ff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          data-aos="zoom-in"
          data-aos-duration="800">
            <div style={styles.statCardIconGold}>
              <Flame size={32} style={{ color: "#DC2626" }} />
            </div>
            <div style={styles.statCardInfo}>
              <span style={styles.statLabel}>Top Performer</span>
              <span style={styles.statNumber}>{sortedPlayers[0]?.name || "—"}</span>
            </div>
          </div>

          <div style={{
            ...styles.statCardSecondary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(246, 201, 14, 0.1)";
            e.currentTarget.style.borderColor = "#060030ff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-duration="800">
            <div style={styles.statCardIconBlue}>
              <Users size={32} style={{ color: "#060030ff" }} />
            </div>
            <div style={styles.statCardInfo}>
              <span style={styles.statLabel}>Total Players</span>
              <span style={styles.statNumber}>{leaderboardData.length}</span>
            </div>
          </div>

          <div style={{
            ...styles.statCardTertiary,
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.1)";
            e.currentTarget.style.borderColor = "#10B981";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="800">
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
          ...styles.leaderboardSection
        }}
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800">
          {sortedPlayers.length > 0 ? (
            <>
              {/* GRID VIEW - All Players as Cards */}
              {viewMode === "grid" && (
                <div style={styles.gridViewSection}>
                  {/* Top 3 Players */}
                  <div style={styles.topThreeWrapper}>
                    {sortedPlayers.slice(0, 3).map((player, index) => {
                      const rankStyles = getRankStyles(index);
                      const isHovered = hoveredIndex === index;

                      return (
                        <div
                          key={player.id}
                          style={{
                            ...styles.playerCard,
                            ...rankStyles.container,
                            ...(isHovered && styles.playerCardHovered)
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {/* Rank Badge */}
                          <div style={{
                            ...styles.rankBadgeContainer,
                            ...rankStyles.badge,
                          }}>
                            <div style={styles.rankBadgeContent}>
                              {[<Flame key="flame" size={24} />, <Medal key="medal1" size={24} />, <Medal key="medal2" size={24} />][index]}
                            </div>
                          </div>

                          {/* Player Info */}
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
                                color: isHovered ? '#060030ff' : '#1E293B',
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
                                Level {Math.min(5, Math.floor(player.totalPoints / 1500) + 1)}
                              </div>
                            </div>
                          </div>

                          {/* Points */}
                          <div style={{
                            ...styles.pointsDisplay,
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                          }}>
                            <div style={styles.pointsLabel}>POINTS</div>
                            <div style={styles.pointsValue}>
                              {player.totalPoints.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Remaining Players - 4 per row */}
                  <div style={styles.remainingPlayersGrid}>
                    {sortedPlayers.slice(3).map((player, index) => {
                      const actualIndex = index + 3;
                      const rankStyles = getRankStyles(actualIndex);
                      const isHovered = hoveredIndex === actualIndex;

                      return (
                        <div
                          key={player.id}
                          style={{
                            ...styles.playerCard,
                            ...rankStyles.container,
                            ...(isHovered && styles.playerCardHovered)
                          }}
                          onMouseEnter={() => setHoveredIndex(actualIndex)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {/* Rank Badge */}
                          <div style={{
                            ...styles.rankBadgeContainer,
                            ...rankStyles.badge,
                          }}>
                            <div style={styles.rankBadgeContent}>
                              <span>{actualIndex + 1}</span>
                            </div>
                          </div>

                          {/* Player Info */}
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
                                color: isHovered ? '#060030ff' : '#1E293B',
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
                                Level {Math.min(5, Math.floor(player.totalPoints / 1500) + 1)}
                              </div>
                            </div>
                          </div>

                          {/* Points */}
                          <div style={{
                            ...styles.pointsDisplay,
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                          }}>
                            <div style={styles.pointsLabel}>POINTS</div>
                            <div style={styles.pointsValue}>
                              {player.totalPoints.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LIST VIEW - All Players as Rows */}
              {viewMode === "list" && (
                <div style={styles.listViewSection}>
                  <div style={styles.listViewContainer}>
                    {sortedPlayers.map((player, index) => {
                      const rankStyles = getRankStyles(index);

                      return (
                        <div key={player.id}>
                          <div
                            style={{
                              ...styles.listViewRow,
                              ...(hoveredIndex === index ? styles.listViewRowHovered : {})
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            {/* Rank Badge */}
                            <div style={{...styles.listRankBadge, ...rankStyles.badge}}>
                              <span style={styles.rankNumber}>{index + 1}</span>
                            </div>

                            {/* Center Section - Avatar, Name, Level (Centered) */}
                            <div style={styles.listCenterSection}>
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

                              <div style={styles.listPlayerInfo}>
                                <div style={{
                                  ...styles.listPlayerName,
                                  color: hoveredIndex === index ? '#060030ff' : '#1E293B',
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
                                  Level {Math.min(5, Math.floor(player.totalPoints / 1500) + 1)}
                                </div>
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
                          
                          {/* Divider after top 3 */}
                          {index === 2 && (
                            <div style={styles.listDivider} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
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
    padding: "32px",
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  // Hero Section
  heroSection: {
    background: "linear-gradient(135deg, #060030ff 0%, #000000ff 100%)",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(37, 44, 53, 0.2)",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  heroContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    gap: "24px",
  },

  titleWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    flex: 1,
    flexDirection: "column",
  },

  mainTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "white",
    margin: "0",
    letterSpacing: "0",
  },

  heroSubtitle: {
    fontSize: "17px",
    color: "rgba(255, 255, 255, 0.9)",
    margin: 0,
    fontWeight: "500",
    letterSpacing: "0.3px",
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },

  statCardPrimary: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    background: "#FFFFFF",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  statCardSecondary: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    background: "#FFFFFF",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  statCardTertiary: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    background: "#FFFFFF",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  statCardIconGold: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFBEB",
    flexShrink: 0,
    animation: "none",
    border: "none",
  },

  statCardIconBlue: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E8F2F8",
    flexShrink: 0,
    animation: "none",
    border: "none",
  },

  statCardIconGreen: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0FDF4",
    flexShrink: 0,
    animation: "none",
    border: "none",
  },

  statCardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  statLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748B",
    textTransform: "none",
    letterSpacing: "0",
  },

  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#252c35",
    lineHeight: 1,
    background: "none",
    WebkitBackgroundClip: "unset",
    WebkitTextFillColor: "unset",
  },

  // Leaderboard Section
  leaderboardSection: {
    marginBottom: "40px",
  },

  gridViewSection: {
    marginBottom: "64px",
    padding: "40px",
    borderRadius: "24px",
    backdropFilter: "blur(10px)"
  },

  listViewSection: {
    marginBottom: "64px",
    padding: "40px",
    borderRadius: "24px",
    backdropFilter: "blur(10px)"
  },

  topThreeSection: {
    marginBottom: "64px",
    padding: "40px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
    borderRadius: "24px",
    border: "2px solid rgba(82, 102, 129, 0.15)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(37, 44, 53, 0.08)",
  },

  remainingPlayersSection: {
    marginBottom: "40px",
    padding: "40px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
    borderRadius: "24px",
    border: "2px solid rgba(82, 102, 129, 0.15)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(37, 44, 53, 0.08)",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#252c35",
    marginBottom: "40px",
    margin: "0 0 40px 0",
    letterSpacing: "-1px",
    background: "linear-gradient(135deg, #060030ff 0%, #000000ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  // View Toggle
  viewToggleContainer: {
    display: "flex",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "6px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  viewToggleButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },

  viewToggleButtonActive: {
    backgroundColor: "#FFFFFF",
    color: "#060030ff",
    borderColor: "none",
    boxShadow: "none",
  },

  viewToggleButtonInactive: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "none",
    opacity: 1,
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "28px",
    marginBottom: "32px",
  },

  topThreeWrapper: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
    marginBottom: "28px",
  },

  remainingPlayersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "28px",
    marginBottom: "32px",
  },

  listViewContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  listViewRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "22px 28px",
    backgroundColor: "#FFFFFF",
    border: "2px solid rgba(82, 102, 129, 0.15)",
    borderRadius: "16px",
    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(37, 44, 53, 0.1)",
  },

  listViewRowHovered: {
    transform: "translateY(-4px) scale(1.01)",
    borderColor: "rgba(82, 102, 129, 0.4)",
    boxShadow: "0 16px 48px rgba(82, 102, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    backgroundColor: "white",
  },

  listRankBadge: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid white",
    boxShadow: "0 6px 16px rgba(37, 44, 53, 0.15)",
    flexShrink: 0,
    color: "white",
    fontWeight: "900",
    fontSize: "18px",
  },

  listAvatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "800",
    boxShadow: "0 6px 16px rgba(37, 44, 53, 0.15)",
    border: "3px solid white",
    flexShrink: 0,
  },

  listPlayerInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  listCenterSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "14px",
    minWidth: 0,
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

  listDivider: {
    height: "10px",
    background: "linear-gradient(90deg, transparent, #000000ff, transparent)",
    margin: "20px 0 0 0",
    borderRadius: "2px",
  },

  playerCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "48px 32px 36px 32px",
    borderRadius: "24px",
    border: "2px solid",
    transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
    minHeight: "350px",
    justifyContent: "space-between",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
  },

  playerCardHovered: {
    transform: "translateY(-16px) scale(1.03)",
    boxShadow: "0 40px 80px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
  },

  rankBadgeContainer: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "5px solid white",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
  },

  rankBadgeContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "950",
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
    width: "68px",
    height: "68px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "800",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
    border: "4px solid white",
  },

  playerTextInfo: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  playerName: {
    fontSize: "20px",
    fontWeight: "900",
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
    padding: "16px 24px",
    background: "linear-gradient(135deg, rgba(252, 211, 77, 0.15) 0%, rgba(252, 211, 77, 0.08) 100%)",
    borderRadius: "14px",
    width: "100%",
    position: "relative",
    transition: "all 0.3s ease",
    border: "1px solid rgba(252, 211, 77, 0.2)",
  },

  pointsLabel: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#252c35",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginBottom: "6px",
  },

  pointsValue: {
    fontSize: "32px",
    fontWeight: "950",
    color: "#252c35",
    lineHeight: 1,
    background: "linear-gradient(135deg, #060030ff 0%, #000000ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  // Search and Filter Section
  searchFilterSection: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "28px",
    marginBottom: "48px",
    alignItems: "center",
    padding: "32px 36px",
    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)",
    borderRadius: "20px",
    border: "2px solid rgba(82, 102, 129, 0.2)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 40px rgba(37, 44, 53, 0.12)",
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 22px",
    backgroundColor: "white",
    border: "2px solid rgba(82, 102, 129, 0.2)",
    borderRadius: "14px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 4px 12px rgba(37, 44, 53, 0.08)",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "inherit",
    color: "#1E293B",
    backgroundColor: "transparent",
    fontWeight: "500",
  },

  clearButton: {
    backgroundColor: "rgba(37, 44, 53, 0.1)",
    border: "none",
    cursor: "pointer",
    color: "#252c35",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    padding: "8px",
    borderRadius: "8px",
    fontWeight: "700",
  },

  filterContainer: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },

  filterSelect: {
    padding: "13px 20px",
    borderRadius: "12px",
    border: "2px solid #252c35",
    backgroundColor: "white",
    color: "#252c35",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily: "inherit",
    minWidth: "180px",
    boxShadow: "0 6px 16px rgba(37, 44, 53, 0.15)",
  },

  // Rating Styles
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  },

  ratingStarsContainer: {
    display: "flex",
    gap: "2px",
  },

  star: {
    fontSize: "16px",
    color: "#FFD700",
    lineHeight: 1,
  },

  halfStar: {
    fontSize: "16px",
    color: "#FFD700",
    lineHeight: 1,
    opacity: 0.6,
  },

  ratingText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#64748B",
  },

  listRatingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
  },

  listRatingText: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748B",
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


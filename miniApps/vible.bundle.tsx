// Vible Mini-App Bundle
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Helper to create web-compatible shadow styles
const createShadow = (
  offset: { width: number; height: number },
  radius: number,
  opacity: number,
  color: string = '#000'
) => {
  if (Platform.OS === 'web') {
    const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px 0px ${color}${hexOpacity}`,
    };
  }
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: Math.max(radius, 3),
  };
};

type Screen = 'healing' | 'explore' | 'post' | 'profile';

export function VibleApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('healing');
  const [selectedDay, setSelectedDay] = useState(1);

  // Healing Screen Component
  const HealingScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HEALING</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerScript}>Jesus</Text>
            <Text style={styles.bannerText}>MAKES ME</Text>
            <Text style={styles.bannerTextLarge}>WHOLE</Text>
          </View>
        </View>

        {/* Day Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dayCardsContainer}
          contentContainerStyle={styles.dayCardsContent}
        >
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCard,
                selectedDay === day && styles.dayCardActive,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  styles.dayNumber,
                  selectedDay === day && styles.dayNumberActive,
                ]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.dayDate,
                  selectedDay === day && styles.dayDateActive,
                ]}
              >
                {day === 1 ? 'Aug 26' : day === 2 ? 'Aug 27' : 'Aug 28'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.dayLabel}>Day {selectedDay} of 6</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Devotional</Text>
            <Text style={styles.actionButtonArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Prayer</Text>
            <Text style={styles.actionButtonArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Declaration</Text>
            <Text style={styles.actionButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('healing')}>
          <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={styles.navIcon}>🦋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('profile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Explore Screen Component
  const ExploreScreen = () => (
    <View style={styles.container}>
      <View style={styles.exploreHeader}>
        <Text style={styles.exploreTitle}>Explore</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Banner */}
        <TouchableOpacity
          style={styles.exploreBanner}
          onPress={() => setCurrentScreen('post')}
        >
          <View style={styles.exploreBannerOverlay}>
            <Text style={styles.exploreBannerText}>Rejoice evermore.</Text>
            <Text style={styles.exploreBannerVerse}>- 1</Text>
          </View>
        </TouchableOpacity>

        {/* Video Buttons */}
        <View style={styles.videoButtons}>
          <TouchableOpacity style={styles.videoButton}>
            <Text style={styles.videoButtonText}>Generate Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoButton}>
            <Text style={styles.videoButtonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>

        {/* Faith Tools */}
        <Text style={styles.sectionTitle}>Faith Tools</Text>
        <View style={styles.faithTools}>
          <TouchableOpacity style={styles.faithToolButton}>
            <Text style={styles.faithToolEmoji}>📖</Text>
            <Text style={styles.faithToolText}>Bible</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faithToolButton}>
            <Text style={styles.faithToolEmoji}>🧑‍🦱</Text>
            <Text style={styles.faithToolText}>DSCPL Bot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faithToolButton}>
            <Text style={styles.faithToolEmoji}>📚</Text>
            <Text style={styles.faithToolText}>Devotions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faithToolButton}>
            <Text style={styles.faithToolEmoji}>🙏</Text>
            <Text style={styles.faithToolText}>Prayers</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Top Posts */}
        <Text style={styles.sectionTitle}>Today's Top Posts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.postsContainer}
        >
          {[
            { id: 1, views: 184, text: 'I WALKED\nINTO MY PARENTS ROOM' },
            { id: 2, views: 175, text: 'Maturing is realizing\nthe most important quality...' },
            { id: 3, views: 194, text: 'Faith Journey' },
          ].map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => setCurrentScreen('post')}
            >
              <View style={styles.postCardImage}>
                <Text style={styles.postCardText}>{post.text}</Text>
              </View>
              <View style={styles.postCardFooter}>
                <Text style={styles.playIcon}>▶</Text>
                <Text style={styles.viewsText}>{post.views}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Creators */}
        <Text style={styles.sectionTitle}>Top Creators</Text>
        <View style={styles.creatorsList}>
          {[
            { username: 'jack', name: 'Jackson Jeisonowski', followers: 20 },
            { username: 'Justice', name: 'Justice Webber', followers: 2 },
            { username: 'nidhi', name: 'Nidhi Gupta', followers: 7 },
            { username: 'Alfi', name: 'Alfi Holsekar', followers: 8 },
          ].map((creator) => (
            <TouchableOpacity
              key={creator.username}
              style={styles.creatorItem}
              onPress={() => setCurrentScreen('profile')}
            >
              <View style={styles.creatorAvatar} />
              <View style={styles.creatorInfo}>
                <Text style={styles.creatorUsername}>{creator.username}</Text>
                <Text style={styles.creatorName}>{creator.name}</Text>
                <Text style={styles.creatorFollowers}>
                  {creator.followers} Followers
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('healing')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={[styles.navIcon, styles.navIconActive]}>🦋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('profile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Post Detail Screen
  const PostScreen = () => (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.postImageContainer}>
          <View style={styles.postImage}>
            <Text style={styles.postOverlayText}>
              he's my everything worth having
            </Text>
          </View>

          {/* Right Side Icons */}
          <View style={styles.postIcons}>
            <View style={styles.postIconItem}>
              <Text style={styles.postIcon}>💬</Text>
              <Text style={styles.postIconCount}>1</Text>
            </View>
            <View style={styles.postIconItem}>
              <Text style={styles.postIcon}>↗</Text>
              <Text style={styles.postIconCount}>3</Text>
            </View>
            <View style={styles.postIconItem}>
              <Text style={styles.postIcon}>🦋</Text>
            </View>
          </View>

          {/* Bottom Info */}
          <View style={styles.postInfo}>
            <View style={styles.postUserInfo}>
              <Text style={styles.postUsername}>@kinha</Text>
              <Text style={styles.verifiedBadge}>✓</Text>
            </View>
            <Text style={styles.postQuestion}>Who is Jesus To You_</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('healing')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={styles.navIcon}>🦋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('profile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileUsername}>kinha</Text>
        <Text style={styles.verifiedBadge}>✓</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>+ Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <Text style={styles.profilePictureEmoji}>🐱</Text>
          </View>
        </View>

        {/* Profile Info */}
        <Text style={styles.profileName}>Sachin Kinha</Text>

        <TouchableOpacity style={styles.creditsButton}>
          <Text style={styles.creditsIcon}>⚡</Text>
          <Text style={styles.creditsText}>Credits: 21.08K</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <Text style={styles.statText}>9 Following</Text>
          <Text style={styles.statText}>29 Followers</Text>
          <Text style={styles.statText}>572 Posts</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <Text style={styles.bioText}>SDE | Competitive Programming |</Text>
        <Text style={styles.bioText}>Deserve before Desire</Text>

        <View style={styles.linkContainer}>
          <Text style={styles.linkIcon}>🔗</Text>
          <Text style={styles.linkText}>https://sachin.com...1 other</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Liked</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>AI Drafts</Text>
          </TouchableOpacity>
        </View>

        {/* Content Grid */}
        <View style={styles.contentGrid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <TouchableOpacity key={item} style={styles.gridItem}>
              <View style={styles.gridItemImage}>
                <Text style={styles.gridPlayIcon}>▶</Text>
                <Text style={styles.gridViews}>{item * 3}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('healing')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('explore')}>
          <Text style={styles.navIcon}>🦋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('profile')}>
          <Text style={[styles.navIcon, styles.navIconActive]}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render current screen
  switch (currentScreen) {
    case 'healing':
      return <HealingScreen />;
    case 'explore':
      return <ExploreScreen />;
    case 'post':
      return <PostScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <HealingScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  // Healing Screen Styles
  bannerContainer: {
    margin: 16,
    marginTop: 8,
  },
  banner: {
    height: 200,
    borderRadius: 16,
    backgroundColor: '#0a4d68',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...createShadow({ width: 0, height: 4 }, 12, 0.3),
  },
  bannerScript: {
    color: '#fff',
    fontSize: 32,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
  },
  bannerTextLarge: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 4,
  },
  dayCardsContainer: {
    marginTop: 8,
  },
  dayCardsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dayCard: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayCardActive: {
    backgroundColor: '#ffd700',
  },
  dayNumber: {
    color: '#ffd700',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayNumberActive: {
    color: '#000',
  },
  dayDate: {
    color: '#ffd700',
    fontSize: 12,
    fontWeight: '500',
  },
  dayDateActive: {
    color: '#000',
  },
  dayLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  actionButtonArrow: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#ffd700',
    padding: 18,
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Explore Screen Styles
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  exploreTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exploreBanner: {
    height: 250,
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#1a4d5e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exploreBannerOverlay: {
    alignItems: 'center',
  },
  exploreBannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  exploreBannerVerse: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.8,
  },
  videoButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  videoButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  videoButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  faithTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  faithToolButton: {
    width: (width - 44) / 2,
    backgroundColor: '#ffd700',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  faithToolEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  faithToolText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  postsContainer: {
    marginBottom: 24,
  },
  postCard: {
    width: 180,
    marginLeft: 16,
    marginRight: 8,
  },
  postCardImage: {
    height: 240,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  postCardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  postCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  playIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 6,
  },
  viewsText: {
    color: '#fff',
    fontSize: 14,
  },
  creatorsList: {
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  creatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorUsername: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  creatorName: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  creatorFollowers: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  // Post Screen Styles
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  postImageContainer: {
    flex: 1,
    position: 'relative',
  },
  postImage: {
    height: 600,
    backgroundColor: '#1a4d5e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postOverlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20,
  },
  postIcons: {
    position: 'absolute',
    right: 16,
    top: 200,
    gap: 24,
  },
  postIconItem: {
    alignItems: 'center',
  },
  postIcon: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 4,
  },
  postIconCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  postInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postUsername: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  verifiedBadge: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postQuestion: {
    color: '#fff',
    fontSize: 16,
  },
  // Profile Screen Styles
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  profileUsername: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 6,
  },
  uploadButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  uploadButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsIcon: {
    color: '#fff',
    fontSize: 24,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureEmoji: {
    fontSize: 50,
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  creditsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd700',
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  creditsIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  creditsText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bioText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  linkIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  linkText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  tabText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffd700',
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  gridItem: {
    width: (width - 48) / 3,
    marginRight: 8,
    marginBottom: 8,
  },
  gridItemImage: {
    height: 150,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    justifyContent: 'flex-end',
    padding: 8,
  },
  gridPlayIcon: {
    color: '#fff',
    fontSize: 16,
  },
  gridViews: {
    color: '#fff',
    fontSize: 12,
  },
  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navIcon: {
    fontSize: 28,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
    fontSize: 32,
  },
});

export default VibleApp;


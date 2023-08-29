import { TabButton, TabContainer, TabUnderline } from '@/styles/followTab';

interface TabsProps {
  activeTab: 'followers' | 'followings';
  onTabChange: (tab: 'followers' | 'followings') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabContainer>
      <TabButton onClick={() => onTabChange('followers')}>팔로워</TabButton>
      <TabButton onClick={() => onTabChange('followings')}>팔로잉</TabButton>
      <TabUnderline $activeTab={activeTab} />
    </TabContainer>
  );
};

export default Tabs;

import Icon from 'react-native-vector-icons/Ionicons';

interface IconComponentProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export const IconComponent = ({
  name,
  size = 24,
  color = 'black',
  onPress,
}: IconComponentProps) => {
  return <Icon name={name} size={size} color={color} onPress={onPress} />;
};

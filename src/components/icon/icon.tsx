import Icon from 'react-native-vector-icons/Ionicons';

interface IconComponentProps {
  name: string;
  size?: number;
  color?: string;
}

export const IconComponent = ({
  name,
  size = 24,
  color = 'black',
}: IconComponentProps) => {
  return <Icon name={name} size={size} color={color} />;
};

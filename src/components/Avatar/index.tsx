import React, { FC, memo } from 'react';
import {
  Image, Text, TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle, useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ImageBackend from '../../../../../../src/components/ImageBackend';
import { AVATAR_OFFSET } from '../../core/constants';
import { StoryAvatarProps } from '../../core/dto/componentsDTO';
import Loader from '../Loader';
import AvatarStyles from './Avatar.styles';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const StoryAvatar: FC<StoryAvatarProps> = ({
  id,
  imgUrl,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors,
  seenColors,
  size,
  showName,
  nameTextStyle,
}) => {

  const loaded = useSharedValue(false);
  const isLoading = useDerivedValue(() => loadingStory.value === id || !loaded.value);
  const loaderColor = useDerivedValue(() => (
    seenStories.value[id] === stories[stories.length - 1]?.id
      ? seenColors
      : colors
  ));

  const onLoad = () => {

    loaded.value = true;

  };

  const imageAnimatedStyles = useAnimatedStyle(() => (
    { opacity: withTiming(isLoading.value ? 0.5 : 1) }
  ));

  let isLocalSource = <ImageBackend buttonProps={{
    disabled: true
  }}
    id={imgUrl}
    style={[
      imageAnimatedStyles,
      { width: size, height: size, borderRadius: size / 2 },
    ]}
    testID="storyAvatarImage"
    onLoad={onLoad} />
  if (typeof imgUrl === 'number') {
    //requrie('path/to/image')
    isLocalSource = <Animated.Image source={imgUrl}
      style={[
        imageAnimatedStyles,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      testID="storyAvatarImage"
      onLoad={onLoad} />
  }


  return (
    <View style={AvatarStyles.name}>
      <View style={AvatarStyles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} testID={`${id}StoryAvatar${stories.length}Story`}>
          <Loader loading={isLoading} color={loaderColor} size={size + AVATAR_OFFSET * 2} />
          <View style={AvatarStyles.avatar}>
            {isLocalSource}
          </View>
        </TouchableOpacity>
      </View>
      {Boolean(showName) && <Text maxFontSizeMultiplier={1.0} numberOfLines={2} style={[nameTextStyle, { width: size }]}>{name}</Text>}
    </View>
  );

};

export default memo(StoryAvatar);

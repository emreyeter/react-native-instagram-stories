import React, { FC, memo } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageBackend from '../../../../../../src/components/ImageBackend';
import { WIDTH } from '../../core/constants';
import { StoryHeaderProps } from '../../core/dto/componentsDTO';
import Close from '../Icon/close';
import HeaderStyles from './Header.styles';

const StoryHeader: FC<StoryHeaderProps> = ( {
  imgUrl, name, onClose, avatarSize, textStyle, buttonHandled, closeColor,
} ) => {

  const styles = { width: avatarSize, height: avatarSize, borderRadius: avatarSize };
  const width = WIDTH - HeaderStyles.container.left * 2;

  return (
    <View style={[ HeaderStyles.container, { width } ]}>
      <View style={HeaderStyles.left}>
        {Boolean( imgUrl ) && (
          <View style={[ HeaderStyles.avatar, { borderRadius: styles.borderRadius } ]}>
            <ImageBackend id={imgUrl} buttonProps={{disabled : true}} style={styles} />
          </View>
        )}
        {Boolean( name ) && <Text style={textStyle}>{name}</Text>}
      </View>
      <TouchableOpacity
        onPress={onClose}
        hitSlop={16}
        testID="storyCloseButton"
        onPressIn={() => {

          buttonHandled.value = true;

        }}
      >
        <Close color={closeColor} />
      </TouchableOpacity>
    </View>
  );

};

export default memo( StoryHeader );

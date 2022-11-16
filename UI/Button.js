import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

/**
 * @author Giulio Milani
 * @param {title, onPress, style, type} props
 * @returns
 */
const Button = ({ title, onPress, style, type }) => {
  const outlinedStyle = {
    borderWidth: 1,
    borderColor: '#2C6BED',
    backgroundColor: 'transparent',
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        type === 'outlined' && outlinedStyle,
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[styles.buttonText, type === 'outlined' && { color: '#2C6BED' }]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2C6BED',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  pressed: {
    opacity: 0.8,
  },
});

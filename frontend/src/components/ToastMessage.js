import { Modal, View, StyleSheet, Text } from 'react-native';
import { GRAY, WHITE } from '../colors';
import { useState } from 'react';

const ToastMessage = () => {};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 82,
    width: '100%',
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    backgroundColor: GRAY[800],
  },
  text: {
    fontSize: 14,
    color: WHITE,
  },
});

export default ToastMessage;

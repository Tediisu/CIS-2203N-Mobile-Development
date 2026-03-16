import React, {useState} from 'react';
import {StatusBar, TouchableOpacity, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Calculator from './android/app/src/Calculator';

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: dark ? '#0f0f11' : '#f0eef9'}}>
        <StatusBar
          barStyle={dark ? 'light-content' : 'dark-content'}
          backgroundColor={dark ? '#0f0f11' : '#f0eef9'}
        />
        <View style={{alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 8}}>
          <TouchableOpacity
            onPress={() => setDark(d => !d)}
            style={{
              backgroundColor: dark ? '#1a1a1f' : '#fff',
              borderWidth: 1,
              borderColor: dark ? '#2e2e36' : '#ddd9f0',
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 5,
            }}>
            <Text style={{
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '700',
              color: dark ? '#6b6a7a' : '#9896b0',
              letterSpacing: 1,
            }}>
              {dark ? '☀ LIGHT' : '☾ DARK'}
            </Text>
          </TouchableOpacity>
        </View>
        <Calculator dark={dark} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
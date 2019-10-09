import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import colors from '../common/colors'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  tabLabel: {
    fontFamily: 'Alfa Slab One',
    fontSize: 13,
    color: colors.background
  },
  barBackground: {
    position: 'absolute',
    height: 3,
    backgroundColor: colors.backgroundBright,
    width: '100%',
    bottom: 0
  },
  barSlider: {
    position: 'absolute',
    height: 3,
    backgroundColor: colors.background,
    width: '50%',
    bottom: 0
  }
})

type Props = {
  tabs: string[]
  children: any
}

export default class Swiper extends PureComponent<Props> {
  state = {
    scrollX: new Animated.Value(0)
  }
  refs: {
    swiper: any
  }

  render() {
    const { tabs, children } = this.props
        , { scrollX } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map((label: string, i: number) =>
            <TouchableOpacity
              key={'swiper.'+i}
              style={styles.tab}
              onPress={() => this.refs.swiper._component.scrollTo({x: i * width})}
              testID={'swiper.'+i}
            >
              <Text style={styles.tabLabel}>
                {label}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.barBackground}/>
          <Animated.View style={[styles.barSlider, {
            transform: [{
              translateX: scrollX.interpolate({
                inputRange: [0, width],
                outputRange: [0, width/2]
              })
            }]
          }]}/>
        </View>

        <Animated.ScrollView
          horizontal
          ref="swiper"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
          )}
          style={{width}}
          pagingEnabled
          scrollEventThrottle={8}
        >
           {/*{...children}*/}
        </Animated.ScrollView>
      </View>
    )
  }
}

import React, { Component } from 'react';
import { View, Text,FlatList, Image,StyleSheet } from 'react-native'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch} from 'react-router-dom';
  import MovieDetailScreen from './MovieDetailScreen';

export default class movieList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }
  componentDidMount() {
    var that = this;
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=5edd3fbc92f915b5d00d8c6952bcd3ea&language=en-US&page=1",
      {
        method: "GET",
      })
      .then((response) => response.json())
        .then((responseJson) => {
          let items = responseJson.results.map((item) => {
            return { 
              id: item.id, 
              src: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'+item.poster_path,
              name :item.original_title
            };
          });
          that.setState({
            dataSource: items,
          });
    })
   
   
  }
  static navigationOptions ={
    title:'Movie List',
    headerStyle: {
    backgroundColor: "#fff"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList 
          data={this.state.dataSource}
          renderItem={({ item }) => (
                <View style={styles.cardContainer} onPress={() => this.props.navigation.navigate('MovieDetailScreen') }>
                  <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                  <Text style={styles.textTitle}>{item.name}</Text>
                </View>
      
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
            
    );
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  cardContainer: {
    width:'50%',
    backgroundColor:'#fff',
    margin:5,
    marginBottom:10,
    padding:10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 3
    },
    elevation: 1,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  textTitle: {
    fontWeight:'bold'
  }
});

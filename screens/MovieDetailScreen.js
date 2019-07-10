import React, { Component } from 'react';
import {Image,Platform,SectionList,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

export default class MovieDetailScreen extends Component  {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Movie Details",
      headerStyle: {backgroundColor: "#fff"},
      headerTitleStyle: {textAlign: "center",flex: 1}
     };
    };
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        dataSource:[]
       };
     }
  componentDidMount() {
    var that = this;
    fetch(
      "https://api.themoviedb.org/3/movie/550?api_key=5edd3fbc92f915b5d00d8c6952bcd3ea",
      {
        method: "GET",
      })
      .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false,
            dataSource: responseJson
           })
         
          // console.log(responseJson)
          // const items =  {
          //     id: responseJson.id, 
          //     src: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'+item.poster_path,
          //     name :item.original_title,
          //     overView : item.overview
          // }
          // return items;
          // that.setState({
          //   dataSource: items,
          // });
    })
   
   
  }
  render(){
    return (
      <SectionList
      renderItem={({ item, section, index }) => (
        <View style={styles.MainContainer}>
          <View style={styles.cardContainer}>
            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
            <Text style={styles.textTitle}>{item}</Text>
          </View>
        </View>
        )}
      />
      // <View>
      //   <Text>Helli</Text>
      // </View>
    );
  }
}

MovieDetailScreen.navigationOptions = {
  header: null,
};

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
})





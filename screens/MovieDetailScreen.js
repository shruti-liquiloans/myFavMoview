import React, { Component } from 'react';
import {Image,Button,FlatList,Alert,StyleSheet,Text,TouchableOpacity,View,ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class MovieDetailScreen extends Component  {
  static navigationOptions ={
    title:'Movie Details',
    headerStyle: {
    backgroundColor: "#fff"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        dataSource:[],
        items:[]
       };
     }

     
  componentDidMount() {
    // const { navigation } = this.props;
    // const movieId = navigation.getParam('movieId');
    this.state.id = '550';//JSON.stringify(movieId);
    //Alert.alert(this.state.id)
   return fetch(
      "https://api.themoviedb.org/3/movie/"+this.state.id+"?api_key=5edd3fbc92f915b5d00d8c6952bcd3ea",
      {
        method: "GET",
      })
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          let items =  [{
                id: responseJson.id, 
                src: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'+responseJson.poster_path,
                name :responseJson.original_title,
                overView : responseJson.overview,
                releaseDate : responseJson.release_date,
            }]
          this.setState({
            loading: false,
            dataSource: items
           })
         
        })
        .catch((error)=> {console.error(error)})
   
   
  }
  render(){
    navigation = this.props.navigation;
    if(this.state.loading){
      return (
        <View style={styles.MainContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
      )
    }else{
      
      let movie = this.state.dataSource.map((item) => {
        return <View key={item.id} style={styles.cardContainer}>
                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                <Text style={styles.textTitle}>{item.name}</Text>
                <Text style={styles.textTitle}>Release Date : {item.releaseDate}</Text>
                <Text style={styles.overViewText}>{item.overView}</Text>
            </View>

      });
      return (
       
        <ScrollView>
            <View style={styles.MainContainer}>{movie}</View>
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
              <Text style={styles.loginButtonSection}>Go Back</Text>
            </TouchableOpacity>
        </ScrollView>
      );
    }
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
    height: 250,
  },
  cardContainer: {
    width:'100%',
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
    fontWeight:'bold',
    fontSize: 18,
    padding:10
  },
  overViewText:{
    padding:10
  },
  textBtnView:{
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
})





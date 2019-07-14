import React, { Component } from 'react';
import {Image,Button,FlatList,Alert,StyleSheet,Text,TouchableOpacity,View,ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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


     componentWillReceiveProps(newProps){
      const { navigation } = newProps;
      const itemId = navigation.getParam('movieId', 'NO-ID');
      this.callAPI(itemId)
     }

     
  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('movieId', 'NO-ID');
   this.callAPI(itemId)
  }

  callAPI(itemId){
    return fetch(
      "https://api.themoviedb.org/3/movie/"+itemId+"?api_key=5edd3fbc92f915b5d00d8c6952bcd3ea",
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
                vote_average : responseJson.vote_average,
            }]
          this.setState({
            loading: false,
            dataSource: items
           })
         
        })
        .catch((error)=> {console.error(error)})

  }
  render(){
    const { navigation } = this.props;
    

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
                <View  style={styles.textContainer}>
                <AnimatedCircularProgress
                      size={50}
                      width={3}
                      fill={item.vote_average}
                      tintColor="#3d5875"
                      backgroundColor="#00e0ff">
                      {
                        (fill) => (
                          <Text>
                            { item.vote_average }
                          </Text>
                        )
                      }
                    </AnimatedCircularProgress>
                    <Text style={styles.textTitle}>{item.name}</Text>
                </View>
                <Text style={styles.textTitle}>Release Date : {item.releaseDate}</Text>
                <Text style={styles.overViewText}>{item.overView}</Text>
            </View>

      });
      return (
       
        <ScrollView>
            <View style={styles.MainContainer}>{movie}</View>
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textBtnView}>Go Back</Text>
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
    backgroundColor: 'dodgerblue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 10,
    textAlign:'center',
  },
  textContainer :{
    flexDirection:'row',
    paddingTop : 2
  }
})
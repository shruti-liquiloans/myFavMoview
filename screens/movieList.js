import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity,ScrollView, Image,StyleSheet,Picker,Alert } from 'react-native'
//import MovieDetailScreen from './MovieDetailScreen';

export default class movieList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }
  componentDidMount() {
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
          this.setState({
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
  onPickerValueChange=(value, index)=>{
    this.setState(
      {
        "throttlemode": value
      },
      () => {
        //  Alert.alert("Throttlemode", this.state.throttlemode);
        fetch(
          "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by="+ this.state.throttlemode+"&language=en-US&api_key=5edd3fbc92f915b5d00d8c6952bcd3ea"
          ,
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
              this.setState({
                dataSource: items,
              });
        })
      }
    );
  }
  render() {
    navigation = this.props.navigation;
    return (
      <ScrollView>
      <View style={styles.MainContainer}>
       <Picker style={styles.pickerStyle}  
              selectedValue={this.state.language}  
              onValueChange={this.onPickerValueChange}  
          >  
          <Picker.Item label="Sort By" value="" /> 
          <Picker.Item label="Popularity Ascending" value="popularity.asc" />  
          <Picker.Item label="Popularity Descending" value="popularity.desc" />  
          <Picker.Item label="Rating Ascending" value="vote_average.asc" /> 
          <Picker.Item label="Rating Descending" value="vote_average.desc" />  
          <Picker.Item label="Release Year Ascending" value="primary_release_year.asc" /> 
          <Picker.Item label="Release Year Descending" value="primary_release_year.desc" />  
      </Picker>  

        <FlatList 
          data={this.state.dataSource}
          renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                 <TouchableOpacity
                      key={item.id}
                      onPress = {() => navigation.navigate("MovieDetailScreen",{movieId: item.id})}
                    >
                  <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                  <Text style={styles.textTitle}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
      
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
      </ScrollView>
            
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

import { Component } from 'react'
import { Card, Spinner } from 'react-bootstrap'

class MovieCard extends Component {
  state = {
    movieDetails: null, // movieDetails dopo il componentDidMount diventerà un oggetto
    // con i dettagli del film... ma al montaggio, al primo render, ancora non li ho!
    // metto un valore vuoto, che poi verrà sostituito dall'oggetto con i dettagli del film
  }

  // questo componente deve recuperare dinamicamente le informazioni per la Card da omdbapi.com
  // il metodo di lifecycle ideale per effettuare una fetch al montaggio del componente è "componentDidMount"
  // componentDidMount viene eseguito UNA VOLTA SOLA, finito il primo render(), e al termine della fetch lo
  // useremo anche per salvare i risultati di ricerca nello state di MovieCard (setState).
  // poichè componentDidMount viene eseguito una volta sola, non avremo problemi di troppe fetch, troppi setState etc.

  componentDidMount() {
    // invocheremo la funzione che farà la fetch
    // riceviamo il titolo del film tramite this.props.movieTitle
    this.fetchMovieDetails()
  }

  fetchMovieDetails = () => {
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle) // inizialmente è "Iron man"
      .then((res) => {
        if (res.ok) {
          // fetch andata bene, recuperiamo l'oggetto con i dati
          return res.json()
        } else {
          throw new Error('Problema nel recupero dei dati')
        }
      })
      .then((data) => {
        console.log('RISULTATO DELLA FETCH', data)
        console.log('i dettagli per la card', data.Search[0])
        this.setState({
          movieDetails: data.Search[0], // sostituisco nello state il vecchio "null" con un oggetto pieno di dettagli
        })
        // a questo punto render() verrà invocato di nuovo, si aggiorna
        // mostrerà la card con i dettagli provenienti dalla fetch :)
      })
      .catch((err) => {
        console.log('ERRORE!', err)
      })

    // con async/await :) ricordati di settare fetchMovieDetails come funzione async
    //   try {
    //       const res = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
    //       if(res.ok) {
    //         const data = await res.json()
    //         console.log('DETTAGLI DEL FILM SELEZIONATO', data)
    //       } else {
    //         throw new Error('Problema nel recupero dei dati')
    //       }
    //   } catch (error) {
    //     console.log('ERRORE!', error)
    //   }
  }

  render() {
    return (
      <>
        <h2>Locandina</h2>
        {!this.state.movieDetails && (
          // primo render
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
          </div>
        )}
        {this.state.movieDetails && (
          // secondo render
          <Card>
            <Card.Img variant="top" src={this.state.movieDetails.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movieDetails.Title}</Card.Title>
              <Card.Text>
                {this.state.movieDetails.imdbID} |{' '}
                {this.state.movieDetails.Year}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    )
  }
}

export default MovieCard

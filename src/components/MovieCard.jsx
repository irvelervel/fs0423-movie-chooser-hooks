import { useState, useEffect } from 'react'
import { Card, Spinner, Alert } from 'react-bootstrap'

const MovieCard = ({ movieTitle }) => {
  // state = {
  //   movieDetails: {}, // movieDetails dopo il componentDidMount diventerà un oggetto
  //   // con i dettagli del film... ma al montaggio, al primo render, ancora non li ho!
  //   // metto un valore vuoto, che poi verrà sostituito dall'oggetto con i dettagli del film
  //   isLoading: true,
  //   isError: false,
  // }

  const [movieDetails, setMovieDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // questo componente deve recuperare dinamicamente le informazioni per la Card da omdbapi.com
  // il metodo di lifecycle ideale per effettuare una fetch al montaggio del componente è "componentDidMount"
  // componentDidMount viene eseguito UNA VOLTA SOLA, finito il primo render(), e al termine della fetch lo
  // useremo anche per salvare i risultati di ricerca nello state di MovieCard (setState).
  // poichè componentDidMount viene eseguito una volta sola, non avremo problemi di troppe fetch, troppi setState etc.

  // componentDidMount
  // lo commentiamo perchè lo useEffect successivo, quello che rimpiazzava il "componentDidUpdate",
  // secondo la logica degli hooks viene COMUNQUE eseguito anche all'avvio
  // useEffect(
  //   () => {
  //     fetchMovieDetails()
  //   },
  //   [
  //     // vuoto! non stiamo dando nessun motivo a questo useEffect per venire re-invocato!
  //   ]
  // )

  // componentDidMount() {
  //   // invocheremo la funzione che farà la fetch
  //   // riceviamo il titolo del film tramite this.props.movieTitle
  //   this.fetchMovieDetails()
  // }

  // componentDidUpdate
  useEffect(() => {
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle])

  // componentDidUpdate(prevProps, prevState) {
  //   // componentDidUpdate viene invocato automaticamente da React (se presente)
  //   // ogni volta che c'è un cambio di props e ogni volta che c'è un cambio di state (setState)
  //   // this.fetchMovieDetails()

  //   // perchè quindi componentDidUpdate risolve questo problema, e render no?
  //   // perchè componentDidUpdate ha DUE PARAMETRI (mentre render non ne ha :( )

  //   // noi vorremmo lanciare la fetch ogni volta che this.props.movieTitle cambia
  //   // qual è il problema? che nella fetch dopo facciamo setState, e quindi RI-ENTRIAMO in componentDidUpdate
  //   // ma noi vorremmo anche NON ri-lanciare la fetch quando cambia lo stato!

  //   if (prevProps.movieTitle !== this.props.movieTitle) {
  //     // se entriamo qui, è perchè è stato scelto un nuovo film dalla tendina
  //     this.fetchMovieDetails()
  //   }
  // }

  const fetchMovieDetails = () => {
    // this.setState({
    //   isLoading: true,
    // })
    setIsLoading(true)

    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + movieTitle) // inizialmente è "Iron man"
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
        setTimeout(() => {
          // this.setState({
          //   movieDetails: data.Search[0], // sostituisco nello state il vecchio "null" con un oggetto pieno di dettagli
          //   isLoading: false,
          // })
          setMovieDetails(data.Search[0])
          setIsLoading(false)
        }, 500) // faccio questa porcheria per evitare che con connessioni molto veloci lo spinner duri troppo poco
        // e lo schermo lampeggi :)

        // a questo punto render() verrà invocato di nuovo, si aggiorna
        // mostrerà la card con i dettagli provenienti dalla fetch :)
      })
      .catch((err) => {
        console.log('ERRORE!', err)
        // this.setState({
        //   isLoading: false,
        //   isError: true,
        // })
        setIsLoading(false)
        setIsError(true)
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

  // this.fetchMovieDetails()
  // non è MAI una buona idea invocare in render() una funzione che fa un setState!
  // --> loop infinito

  // render() viene invocato automaticamente da React ogni volta che cambiano le props o che cambia lo stato

  return (
    <>
      <h2>Locandina</h2>
      {isLoading && (
        // primo render
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
      {isError && <Alert variant="danger">Errore nel recupero film</Alert>}
      {!isLoading && !isError && (
        // secondo render
        <Card>
          <Card.Img variant="top" src={movieDetails.Poster} />
          <Card.Body>
            <Card.Title>{movieDetails.Title}</Card.Title>
            <Card.Text>
              {movieDetails.imdbID} | {movieDetails.Year}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default MovieCard

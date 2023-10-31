import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// import {Form} from 'react-bootstrap'
import Form from 'react-bootstrap/Form' // import più specifico, meglio :)
import Container from 'react-bootstrap/Container' // import più specifico, meglio :)
import Row from 'react-bootstrap/Row' // import più specifico, meglio :)
import Col from 'react-bootstrap/Col' // import più specifico, meglio :)
import { useState } from 'react'
import MovieCard from './components/MovieCard'

// il valore del dropdown va salvato nello stato del componente (2-way data binding!)

const App = () => {
  // state = {
  //   movieTitle: 'Iron man',
  // }

  const [movieTitle, setMovieTitle] = useState('Iron man')

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Form.Select
                value={movieTitle}
                onChange={(e) =>
                  // this.setState({
                  //   movieTitle: e.target.value,
                  // })
                  setMovieTitle(e.target.value)
                }
              >
                <option>Iron man</option>
                <option>Groot</option>
                <option>Thor</option>
                <option>Hulk</option>
                <option>Deadpool</option>
                <option>Superman</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
              <MovieCard movieTitle={movieTitle} />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

export default App

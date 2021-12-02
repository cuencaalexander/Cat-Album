import React, { useEffect, useState } from 'react';
import { Card, Button, Icon, Image, Loader } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState, CatDetail } from './redux/cat/cat.reducer';
import { addCat } from './redux/cat/cat.action';
import { nextTick } from 'process';



const API_ENDPOINT = 'https://api.thecatapi.com/v1/images/search';

function App() {
  const dispatch = useDispatch();

  const [fetchNew, setFetchNew] = useState<number>(1);
  const [fetchInProgress, setfetchInProgress] = useState<boolean>(true);
  const cats = useSelector((store: AppState) => store.cat.cats);
  const totalCats = useSelector((store: AppState) => store.cat.cats.length);
  const [index, setIndex] = useState<number>(totalCats+1);


  useEffect(() => {
    setfetchInProgress(true);
    fetch(API_ENDPOINT).then((res) => res.json()).then(res => {
      if (res.length > 0) {
        dispatch(addCat(res[0]));
      }
      setfetchInProgress(false);
    }).catch(err => {
      setfetchInProgress(false);
      console.log(err)
    });
  }, [fetchNew])

  return (
    <div className="App">
      {fetchInProgress && <Loader active inline='centered' />}
      {!fetchInProgress && totalCats && <Card>
        <Image src={cats[index - 1]?.url} wrapped ui={false} />
        <Card.Content>
          {cats[index - 1]?.categories && <Card.Header>Categories : {cats[index - 1]?.categories?.map(categorie => categorie.name).join(",")}</Card.Header>}
          <Card.Meta>
           <p>Url: {cats[index - 1]?.url}</p>
            <p>Height: {cats[index - 1]?.height}</p>
            <p>Width: {cats[index - 1]?.width}</p>
          </Card.Meta>
          <Card.Description>
            {cats[index - 1]?.breeds?.map(breed => breed.description).join(', ')}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button animated onClick={() => setIndex(index - 1)} disabled={index === 1}>
            <Button.Content visible>Prev</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
          <Button animated onClick={() => setIndex(index + 1)} disabled={index === totalCats}>
            <Button.Content visible >Next</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Card.Content>
        <Card.Content extra>
          <Button animated onClick={() => setFetchNew(fetchNew + 1)}>
            <Button.Content visible >Fetch New Cat</Button.Content>
            <Button.Content hidden>
              <Icon name='refresh' />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>}
    </div>
  );
}

export default App;
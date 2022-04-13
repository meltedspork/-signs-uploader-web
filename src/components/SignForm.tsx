import { useContext, useEffect, useState } from 'react';
import classNames from  'classnames';
import ResourceContext from '../contexts/ResourceContext';
import TextField from './inputs/TextField';
import SelectField from './inputs/SelectField';
import VideoFields from './inputs/VideoFields';
import Form from 'react-bootstrap/Form';

const SignForm = ({ children }: any) => {
  const {
    loading,
    error,
    data,
    setInputData,
    readOnly,
    reset,
    setReset,
  } = useContext(ResourceContext);

  const [resetReadOnly, setResetReadOnly] = useState(readOnly);
  const [inputVideoFiles, setInputVideoFiles] = useState(null);
  const [inputName, setInputName] = useState('');
  const [inputPronounce, setInputPronounce] = useState('');
  const [inputDefinition, setInputDefinition] = useState('');
  const [inputVideos, setInputVideos] = useState([] as any);
  const [inputTopics, setInputTopics] = useState([] as any);
  const [optTopics, setOptTopics] = useState([] as any);

  useEffect(() => {
    if (loading || error) return;

    console.log('---->', data);

    if (data && data.topics) {
      setOptTopics(data.topics);
    }

    if (readOnly && resetReadOnly) {
      const {
        sign: {
          name = '',
          pronounce = '',
          definition = '',
          videos = [],
          topics = [],
        },
      } = data;

      setInputName(name);
      setInputPronounce(pronounce);
      setInputDefinition(definition);
      setInputVideos(videos);
      setInputTopics(topics);
      setResetReadOnly(false);
    } else if (reset) {
      setInputVideoFiles(null);
      setInputName('');
      setInputPronounce('');
      setInputDefinition('');
      setInputVideos([]);
      setInputTopics([]);
      setReset(false);
    }

    const updatedSignData = {
      videoFile: inputVideoFiles,
      name: inputName,
      pronounce: inputPronounce,
      definition: inputDefinition,
      topics: inputTopics.map(({ uid }: any) => uid),
    };
    setInputData(updatedSignData);
  }, [
    setResetReadOnly, resetReadOnly,
    setReset, reset,
    loading,
    error,
    readOnly,
    data,
    setInputData,
    setInputVideoFiles, inputVideoFiles,
    setInputVideos,
    setInputName, inputName,
    setInputPronounce, inputPronounce,
    setInputDefinition, inputDefinition,
    setInputTopics, inputTopics, setOptTopics,
  ]);

  return (
    <Form className={classNames({ loading })}>
      <TextField label="Name" value={inputName} onChange={setInputName} readOnly={readOnly} />
      <TextField label="Pronounce" value={inputPronounce} onChange={setInputPronounce} readOnly={readOnly} />
      <TextField label="Definition" value={inputDefinition} onChange={setInputDefinition} readOnly={readOnly} />
      <SelectField label="Topics" value={inputTopics} options={optTopics} onChange={setInputTopics} readOnly={readOnly} />
      <VideoFields title={inputName} videos={inputVideos} onChange={setInputVideos} readOnly={readOnly} />
      {/* <VideoGrid title={inputName} data={inputVideos} readOnly={readOnly} /> */}
      {children}
    </Form>
  );
}

export default SignForm;

/* eslint-disable consistent-return */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { serverURI } from '../constants';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prompt: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const serverConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(form.prompt && form.photo)) return alert('Please fill the form first');
    setLoading(true);
    try {
      await axios.post(`${serverURI}/api/v1/post/`, form, serverConfig);
      navigate('/');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (!form.prompt) return alert("Prompt can't be empty");
    setGeneratingImage(true);
    try {
      const res = await axios.post(
        `${serverURI}/api/v1/dalle/`,
        { prompt: form.prompt },
        serverConfig
      );
      const photo = `data:image/jpeg;base64,${res.data.photo}`;
      setForm({ ...form, photo });
    } catch (e) {
      alert(e);
    } finally {
      setGeneratingImage(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      {/* Heading  */}
      <div>
        <h1 className="font-extrabold text-[#2223228] text-[32px]">Create</h1>
        <p className="mt-2 text-[#0a0e11] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images generated through DALL-E AI
        </p>
      </div>

      {/* Form Section  */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A BBQ that is alive, in the style of a Pixar animated movie"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        {/* Image and loader  */}
        <div className="relative bg-gray-50 mt-10 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
          ) : (
            <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
          )}

          {generatingImage && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg>">
              <Loader />
            </div>
          )}
        </div>

        {/* Generate Image button  */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center sm:w-auto">
            {generatingImage ? 'Generating...' : form.photo ? 'Re-Generate' : 'Generate'}
          </button>
        </div>

        {/* Share with community text and button  */}
        <div className="mt-10">
          <p className="mt-10 text-[#666e75]">
            Once you have created the image you want, you can share it with others in the community.
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-purple font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : 'Share with community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

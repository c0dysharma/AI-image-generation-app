import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Loader, Card, FormField } from '../components';

const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return <h2 className="mt-5 font-bold text-purple text-xl uppercase">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/post');
        if (res.data.success) setAllPosts(res.data.data.reverse());
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      {/* Heading  */}
      <div>
        <h1 className="font-extrabold text-[#2223228] text-[32px]">The Commuinity Showcase</h1>
        <p className="mt-2 text-[#0a0e11] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by
          DALL-E AI
        </p>
      </div>

      {/* Search Area */}
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {/* Result Text  */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div>
            {searchText && (
              <h2 className="font-medium text-[#666e75]">
                Showing result for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
          </div>
        )}

        {/* Result images */}
        {!loading && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
            {searchText ? (
              <RenderCards data={[]} title="No search results found" />
            ) : (
              <RenderCards data={allPosts} title="No posts found" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

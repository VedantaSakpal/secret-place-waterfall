import React, { useState, useEffect } from 'react';
import { Image, Heart, MapPin, Feather, Plus, Camera, Send, X } from 'lucide-react';
import { GalleryPost } from '../types';
import { INITIAL_GALLERY } from '../data';

export default function GalleryView() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postDesc, setPostDesc] = useState('');
  
  // Controls
  const [showForm, setShowForm] = useState(false);

  // Suggested preset images of waterfall/forest to make upload easy for user
  const presetPhotos = [
    { name: 'Lagoon', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800' },
    { name: 'Trek', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Jumping pool', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800' }
  ];

  // Load posts
  useEffect(() => {
    const saved = localStorage.getItem('waterfall_gallery_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
        setPosts(INITIAL_GALLERY);
      }
    } else {
      setPosts(INITIAL_GALLERY);
    }
  }, []);

  const handleLike = (id: string) => {
    const updated = posts.map(post => {
      if (post.id === id) {
        const likedByMe = !post.likedByMe;
        return {
          ...post,
          likes: likedByMe ? post.likes + 1 : Math.max(0, post.likes - 1),
          likedByMe
        };
      }
      return post;
    });
    setPosts(updated);
    localStorage.setItem('waterfall_gallery_posts', JSON.stringify(updated));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !postTitle || !postDesc) {
      alert('Please fill in required fields.');
      return;
    }

    const defaultImg = presetPhotos[Math.floor(Math.random() * presetPhotos.length)].url;
    const finalImg = postImage.trim() || defaultImg;

    const newPost: GalleryPost = {
      id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
      author: authorName,
      authorRole: 'Sanctuary Explorer',
      date: new Date().toISOString().split('T')[0],
      title: postTitle,
      imageUrl: finalImg,
      description: postDesc,
      likes: Math.floor(Math.random() * 5) + 1,
      likedByMe: false
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('waterfall_gallery_posts', JSON.stringify(updated));

    // Clear and collapse
    setAuthorName('');
    setPostTitle('');
    setPostImage('');
    setPostDesc('');
    setShowForm(false);
  };

  return (
    <div id="gallery-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 font-sans animate-fade-in space-y-12">
      
      {/* 1. Header Hero Area */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
          Curated Reflections
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest-900 leading-tight">
          Capture the Ephemeral
        </h2>
        <p className="text-xs sm:text-sm text-forest-700 font-light leading-relaxed">
          Observe and share natural fragments captured by the community at Vile Village. Add your own mist moments below to be added to our shared digital board.
        </p>

        {/* Form toggler trigger */}
        <div className="pt-4">
          <button
            id="toggle-post-form-btn"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-warm-50 text-xs font-semibold rounded-xl inline-flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            {showForm ? (
              <>
                <X className="h-4 w-4" />
                <span>Close Reflection Cabin</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Publish Your Mist Reflection</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Interactive reflective upload Form (collapsible) */}
      {showForm && (
        <div id="reflection-creation-panel" className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-forest-150 shadow-md animate-fade-in space-y-5">
          <div className="flex items-center space-x-2 border-b border-forest-50 pb-3">
            <Feather className="h-5 w-5 text-forest-600" />
            <h3 className="font-serif text-lg font-bold text-forest-950">Record Your Encounter</h3>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Author */}
              <div className="space-y-1">
                <label htmlFor="author-input" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                  Your Signature Name
                </label>
                <input 
                  type="text" 
                  id="author-input"
                  required
                  placeholder="e.g. Christian S."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-warm-50 border border-forest-150 rounded-xl text-xs sm:text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label htmlFor="title-input" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                  Encounter Title
                </label>
                <input 
                  type="text" 
                  id="title-input"
                  required
                  placeholder="e.g. Morning Solitude"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-warm-50 border border-forest-150 rounded-xl text-xs sm:text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            {/* Custom Image URL or Preset select */}
            <div className="space-y-1.5">
              <label htmlFor="image-input" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                Photo URL (Or choose a preset below)
              </label>
              <input 
                type="url" 
                id="image-input"
                placeholder="https://images.unsplash.com/..."
                value={postImage}
                onChange={(e) => setPostImage(e.target.value)}
                className="w-full px-3 py-2.5 bg-warm-50 border border-forest-150 rounded-xl text-xs text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 font-mono"
              />

              {/* Presets */}
              <div className="flex gap-2 pt-1 flex-wrap">
                <span className="text-[10px] text-forest-500 font-mono self-center">Presets:</span>
                {presetPhotos.map((p, pidx) => (
                  <button
                    key={pidx}
                    type="button"
                    onClick={() => setPostImage(p.url)}
                    className="px-2 py-1 bg-forest-50 hover:bg-forest-100 border border-forest-100 text-[10px] text-forest-700 rounded-lg transition-colors"
                  >
                    ✦ {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection description */}
            <div className="space-y-1">
              <label htmlFor="desc-input" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                Reflective Text
              </label>
              <textarea 
                id="desc-input"
                required
                rows={3}
                placeholder="What did your skin feel like? Describe the moss, the cool mist, or the deep echoes..."
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                className="w-full px-3 py-2.5 bg-warm-50 border border-forest-150 rounded-xl text-xs sm:text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
              />
            </div>

            <button
              type="submit"
              id="submit-reflection-btn"
              className="w-full py-3 bg-forest-700 hover:bg-forest-800 text-warm-50 text-xs font-semibold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-colors shadow"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Reflection to Board</span>
            </button>

          </form>
        </div>
      )}

      {/* 3. Community Reactions / Grid Stream */}
      <div id="gallery-contributions-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-2xl border border-forest-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            
            {/* Visual media layout */}
            <div className="relative group overflow-hidden h-64">
              <img 
                src={post.imageUrl || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800'} 
                alt={post.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute top-3 left-3 bg-forest-950/70 backdrop-blur text-warm-100 px-2.5 py-1 text-[10px] rounded-lg tracking-wider font-mono">
                {post.date}
              </div>
            </div>

            {/* Inner description text bodies */}
            <div className="p-5 flex-grow space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-lg text-forest-950 leading-tight">
                  {post.title}
                </h3>
                <p className="text-xs text-forest-800 font-light leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Reactions HUD bottom row */}
              <div className="flex justify-between items-center pt-4 border-t border-forest-50 mt-4 text-xs font-mono">
                <div>
                  <span className="font-semibold text-forest-900 block truncate">{post.author}</span>
                  {post.authorRole && (
                    <span className="text-[9px] text-forest-400 uppercase tracking-widest block font-medium">
                      {post.authorRole}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleLike(post.id)}
                  id={`like-post-${post.id}`}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                    post.likedByMe 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-warm-50 border-forest-100 text-forest-500 hover:text-forest-800'
                  }`}
                  title={post.likedByMe ? "Unlike Reflection" : "Heart Reflection"}
                >
                  <Heart className={`h-4 w-4 ${post.likedByMe ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                  <span className="font-semibold">{post.likes}</span>
                </button>
              </div>

            </div>

          </article>
        ))}
      </div>

    </div>
  );
}

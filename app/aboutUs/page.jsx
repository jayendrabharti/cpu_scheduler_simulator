"use client";
import React, { useEffect, useState } from 'react';
import { Users, Github, Globe, Mail, MapPin, BookOpen } from 'lucide-react';

// Add GitHub usernames here
const developers = [
    "jayendrabharti",
    "shivamsharma3435",
    "charchit16"
  // Add more GitHub usernames as needed
];

function AboutUs() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilePromises = developers.map(username =>
          fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
        );
        const fetchedProfiles = await Promise.all(profilePromises);
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error('Error fetching GitHub profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="overflow-y-scroll min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" /> */}
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <div className="absolute -inset-8 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
            <Users size={80} className="text-blue-400 relative animate-bounce" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 animate-gradient">
            Meet Our Team
          </h1>

          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array(developers.length).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-700 animate-pulse">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-32 h-32 bg-gray-700 rounded-full" />
                      <div className="h-6 w-48 bg-gray-700 rounded" />
                      <div className="h-4 w-36 bg-gray-700 rounded" />
                      <div className="h-4 w-24 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))
              ) : (
                profiles.map((profile, index) => (
                  <div
                    key={index}
                    className="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-700 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                    // onClick={() => window.open(profile.html_url, '_blank')}
                    // role="button"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={profile.avatar_url}
                          alt={profile.name}
                          className="w-32 h-32 rounded-full border-4 border-blue-400/20 group-hover:border-blue-400/50 transition-colors"
                        />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-blue-400">{profile.name}</h2>
                      <p className="text-gray-300 text-center">{profile.bio}</p>
                      
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {profile.location && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                        
                        {profile.blog && (
                          <a
                            href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Website</span>
                          </a>
                        )}
                        
                        <a
                          href={profile.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-16 bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-blue-400">About the Project</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  The CPU Scheduler project is an educational tool designed to help students and professionals understand various CPU scheduling algorithms. It provides interactive visualizations and detailed explanations of different scheduling mechanisms used in operating systems.
                </p>
                <p className="text-gray-300 mt-4">
                  Our goal is to make complex scheduling concepts more accessible through practical examples and visual demonstrations. The project showcases six fundamental scheduling algorithms: FCFS, SJF, SRTF, Priority (both preemptive and non-preemptive), and Round Robin.
                </p>
                <p className="text-gray-300 mt-4">
                  We welcome contributions and feedback from the community to enhance this educational resource and make it even more valuable for learners worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
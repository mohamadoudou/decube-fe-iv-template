import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movies() {
  const [moviesList, setMoviesList] = useState();

  const fecthMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        },
      ).then((data) => data.json());

      return data;
    } catch (e) {
      console.log("sorry something went wrong", e);
    }
  };

  useEffect(() => {
    const data = fecthMovies().then((data) => {
      console.log("data2", data.results);
      setMoviesList(data.results);
    });
  }, []);

  return (
    <div>
      <ul>
        {moviesList?.map((movie) => (
          <li
            key={movie.id}
            className="h-10 rounded bg-slate-400 m-1 p-2 truncate"
          >
            {
              <Link href={`/movies/${movie.id}`}>
                View details{movie.original_title}
              </Link>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

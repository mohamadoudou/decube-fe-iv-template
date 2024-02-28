import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export const getServerSideProps = (async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    }
  );

  const moviesList = await res.json();
  return { props: { moviesList: moviesList.results as Movie[] } };
}) satisfies GetServerSideProps<{ moviesList: Movie[] }>;

export default function Movies({
  moviesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!moviesList) return <div>Loading</div>;

  return (
    <div className="w-5/6 ml-auto mr-auto my-8 flex sm:w-11/12 lg:w-10/12">
      <ul className="flex flex-wrap">
        {moviesList.map((movie: Movie) => (
          <li
            key={movie.id}
            className="rounded bg-gray-50 text-gray-950 overflow-hidden
          m-1 flex-grow w-auto h-auto block shadow-sm hover:shadow-2xl sm:w-5/12 md:w-3/12 "
          >
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${movie.backdrop_path}`}
                width={500}
                height={600}
                alt={movie.title}
              />
              <div className="p-2 pt-2">
                <h3 className="font-semibold leading-4">
                  {movie.original_title} ({movie.release_date.split("-")[0]})
                </h3>
                <div className="flex mt-4 justify-between items-center">
                  <p className="text-sm px-2 bg-indigo-100 block rounded-full w-12">
                    <span className="font-semibold">
                      {Math.round(movie.vote_average)}
                    </span>
                    /10
                  </p>
                  <p>{movie.vote_count} reviews</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

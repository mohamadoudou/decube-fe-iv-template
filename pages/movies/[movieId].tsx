import Image from "next/image";
import type { Movie } from "./index";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async (context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${context.query?.movieId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    }
  );
  const movie = await res.json();
  return {
    props: {
      movie: movie as Movie,
    },
  };
}) satisfies GetServerSideProps<{ movie: Movie }>;

export default function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) return <div>Loading</div>;

  return (
    <div className="w-11/12 h- my-3 ml-auto mr-auto bg-gray-800 sm:w-3/5 lg:w-2/3 md:flex md:w-full  md:h-[600px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${movie.poster_path}`}
        objectFit="cover"
        width={400}
        height={400}
        alt={movie.title}
      />
      <div className="p-2 pt-2">
        <h3 className="font-semibold leading-4">
          {movie.original_title} ({movie.release_date.split("-")[0]})
        </h3>
        <div className="flex flex-col mt-4 lg:block">
          <p className="w-5/6 lg:w-full">{movie.overview}</p>
          <div className="lg:w-2/5 mt-4">
            <p className="text-sm px-2 bg-indigo-100 block rounded-full w-12">
              <span className="font-semibold">
                {Math.round(movie.vote_average)}
              </span>
              /10
            </p>
            <p>{movie.vote_count} reviews</p>
          </div>
          {/* <p>{movie.popularity}</p>
          <p>{movie.original_language}</p> */}
        </div>
      </div>
    </div>
  );
}

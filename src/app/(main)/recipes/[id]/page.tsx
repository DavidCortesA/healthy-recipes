'use client'
import RecipeDetail from "@/components/recipes/RecipeDetail";
import { useParams } from "next/navigation";

export default function RecipeDetailPage() {
  const { id } = useParams();

  return (
    <RecipeDetail id={id} />
  );
}
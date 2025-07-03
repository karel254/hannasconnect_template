/**
 * Re-export the toast hook from `src/hooks`.
 * This fixes the broken alias "@/hooks/use-toast" that was causing
 * “file not found” build errors.
 */

export * from "../../hooks/use-toast"

'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function revalidateByTag(tag: string) {
  revalidateTag(tag);
  return { success: true, message: `revalidated tag: "${tag}"` };
}

export async function revalidateByPath(path: string) {
  revalidatePath(path);
  return { success: true, message: `revalidated path: "${path}"` };
}

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR/revalidate in this app, so no incremental cache or R2 binding.
export default defineCloudflareConfig();

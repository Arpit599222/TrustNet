import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function inspectSchema() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing service role credentials');
    return;
  }

  try {
    console.log('Fetching PostgREST OpenAPI schema spec using Service Role key...');
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`
      }
    });

    const data: any = await res.json();
    const definitions = data.definitions;
    if (definitions) {
      console.log('Available table definitions:', Object.keys(definitions));
      if (definitions.users) {
        console.log('\nFound "users" table definition in OpenAPI spec:');
        console.log(JSON.stringify(definitions.users.properties, null, 2));
      } else {
        console.log('No "users" definition found in definitions list.');
      }
    } else {
      console.log('No definitions found in OpenAPI spec.');
    }
  } catch (err) {
    console.error('Error fetching spec:', err);
  }
}

inspectSchema();

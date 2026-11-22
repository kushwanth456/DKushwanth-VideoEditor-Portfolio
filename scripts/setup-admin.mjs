import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const rl=createInterface({input:stdin,output:stdout});
try{
 const email=(await rl.question('Admin email: ')).trim().toLowerCase();
 const password=await rl.question('Admin password (at least 14 characters): ');
 if(!/^\S+@\S+\.\S+$/.test(email))throw new Error('Enter a valid email address.');
 if(password.length<14)throw new Error('Password must contain at least 14 characters.');
 const salt=randomBytes(16),derived=pbkdf2Sync(password,salt,310000,32,'sha256');
 await mkdir(path.join(root,'data'),{recursive:true});
 await writeFile(path.join(root,'data','admin.json'),JSON.stringify({email,password_hash:`${salt.toString('hex')}:${derived.toString('hex')}`},null,2),{encoding:'utf8',mode:0o600});
 console.log('Admin account saved in data/admin.json. Keep this folder private.');
}catch(e){console.error(e.message);process.exitCode=1}finally{rl.close()}

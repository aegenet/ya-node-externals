use std::env;
use serde::Deserialize;
use std::error::Error;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;
use std::time::Instant;
extern crate walkdir;
use walkdir::{DirEntry, WalkDir};

#[derive(Deserialize, Debug)]
struct PackageJson {
    #[serde(default)]
    name: String,
}

fn read_dependencies_from_file<P: AsRef<Path>>(path: P) -> Result<PackageJson, Box<dyn Error>> {
  // Open the file in read-only mode with buffer.
  let file = File::open(path)?;
  let reader = BufReader::new(file);

  // Read the JSON contents of the file as an instance of `User`.
  let u = serde_json::from_reader(reader)?;

  // Return the `PackageJson`.
  Ok(u)
}

fn is_package_json(entry: &DirEntry) -> bool {
  entry.path()
       .to_str().expect("String").ends_with("package.json")
}

fn main() {
  let now = Instant::now();
  let args: Vec<String> = env::args().collect();

  let cwd: String = if args.len() > 1 { args[1].to_string() } else { ".".to_owned() };

  let mut dependencies: Vec<String> = Vec::new();
  
  for file in WalkDir::new(cwd).into_iter().filter_map(|file| file.ok()) {
    if is_package_json(&file) {
      dependencies.push(read_dependencies_from_file(&file.path()).unwrap().name);
    }
  }

  let elapsed = now.elapsed();
  println!("{:#?}", dependencies);
  println!("Elapsed: {:.2?}", elapsed);
  println!("Len: {:#?}", dependencies.len());
}

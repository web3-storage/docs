package main

//#region imports
import (
	"context"
	"fmt"
	"io/fs"

	cid "github.com/ipfs/go-cid"
	w3s "github.com/web3-storage/go-w3s-client"
)

//#endregion imports

//#region retrieveFiles
func retrieveFiles(client w3s.Client, cidString string) (fs.File, fs.FS, error) {
	c, err := cid.Parse(cidString)
	if err != nil {
		return nil, nil, err
	}

	res, err := client.Get(context.Background(), c)
	if err != nil {
		return nil, nil, err
	}

	if res.StatusCode != 200 {
		return nil, nil,
			fmt.Errorf("request for %s was unsuccessful: [%d]: %s",
				cidString, res.StatusCode, res.Status)
	}

	// res is an http.Response with an extra method for reading IPFS UnixFS files
	return res.Files()
}

//#endregion retrieveFiles

//#region listDirectory
func listDirectory(f fs.File) error {
	// make sure the File is actually a directory that supports listing contents
	d, ok := f.(fs.ReadDirFile)
	if !ok {
		return fmt.Errorf("not a directory")
	}

	dirEntries, err := d.ReadDir(0)
	if err != nil {
		return err
	}

	// print the name of each file or directory inside.
	// note that this does not traverse nested directories.
	for _, entry := range dirEntries {
		fmt.Println(entry.Name())
	}
	return nil
}

//#endregion listDirectory

//#region walkDirectory
func walkDirectory(fsys fs.FS) {
	// Walk whole directory contents (including nested directories)
	fs.WalkDir(fsys, "/", func(path string, d fs.DirEntry, err error) error {
		info, _ := d.Info()
		fmt.Printf("%s (%d bytes)\n", path, info.Size())
		return err
	})
}

//#endregion walkDirectory

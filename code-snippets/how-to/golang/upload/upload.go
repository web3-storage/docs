package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"path"

	"github.com/web3-storage/go-w3s-client"
)

func main() {
	// Get an API token and file path from the cli args
	tokenPtr := flag.String("token", "", "A Web3.Storage API token")
	flag.Parse()

	if tokenPtr == nil || *tokenPtr == "" {
		usage()
	}

	if len(flag.Args()) < 1 {
		usage()
	}
	filepath := flag.Args()[0]

	// Create a new Web3.Storage client using the token
	client, err := w3s.NewClient(w3s.WithToken(*tokenPtr))
	if err != nil {
		handleError(err)
		return
	}

	// Open the file for reading
	file, err := os.Open(filepath)
	if err != nil {
		handleError(err)
		return
	}

	// Upload to Web3.Storage
	cid, err := client.Put(context.Background(), file)
	if err != nil {
		handleError(err)
		return
	}

	fmt.Printf("Stored %s with Web3.Storage! View it at:\n", path.Base(filepath))
	fmt.Printf("https://%v.ipfs.dweb.link\n", cid)
}

func usage() {
	fmt.Fprintf(os.Stderr, "usage: %s -token=<api-token> <file-path>\n", os.Args[0])
	os.Exit(1)
}

func handleError(err error) {
	// don't do this in production :)
	panic(err)
}

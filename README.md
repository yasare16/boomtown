# Purchase History Take Home Exercise
To run this application, begin by cloning this repo:

`git clone https://github.com/yasare16/idme.git`

 Navigate to the root of this directory and run the command:

`npm run start`

\0/

// helper method which creates a new node to
// be inserted and calls insertNode
insert(data)
{
    // Creating a node and initialising
    // with data
    var newNode = new Node(data);
                     
    // root is null then node will
    // be added to the tree and made root.
    if(this.root === null)
        this.root = newNode;
    else
 
        // find the correct position in the
        // tree and add the node
        this.insertNode(this.root, newNode);
}
 
// Method to insert a node in a tree
// it moves over the tree to find the location
// to insert a node with a given data
insertNode(node, newNode)
{
    // if the data is less than the node
    // data move left of the tree
    if(newNode.data < node.data)
    {
        // if left is null insert node here
        if(node.left === null)
            node.left = newNode;
        else
 
            // if left is not null recur until
            // null is found
            this.insertNode(node.left, newNode);
    }
 
    // if the data is more than the node
    // data move right of the tree
    else
    {
        // if right is null insert node here
        if(node.right === null)
            node.right = newNode;
        else
 
            // if right is not null recur until
            // null is found
            this.insertNode(node.right,newNode);
    }
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
     // Our implementation logic will go here 
      
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
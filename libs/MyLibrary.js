function RemoveFromArray(index,table)
{
    if(index == table.length-1)
    {
        table.pop()
        return table;
    }
    else
    {
        for(var i=index;i<table.length;i++)
        {
            table[i] = table[i + 1];
        }
        table.pop();
        return table;
    }
}
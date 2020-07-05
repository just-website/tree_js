export const createNode = (data) => {
    `
    <div class="tree__node" draggable="true">
        <div class="tree__node-symbol">+</div>
            <div class="tree__node-content">
                <div class="tree__node-text">
                    какой то текст 1
                </div>
                <div class="tree__node-children">
                    <div class="tree__node">
                        <div class="tree__node-symbol">+</div>
                        <div class="tree__node-content">
                            <div class="tree__node-text">
                                какой то текст 2
                            </div>
                            <div class="tree__node-children">
            
                            </div>
                        </div>
                    </div>
                    <div class="tree__node">
                        <div class="tree__node-symbol">+</div>
                        <div class="tree__node-content">
                            <div class="tree__node-text">
                                какой то текст 3
                            </div>
                            <div class="tree__node-children">
            
                            </div>
                        </div>
                    </div>
                    <div class="tree__node">
                        <div class="tree__node-symbol">+</div>
                        <div class="tree__node-content">
                            <div class="tree__node-text">
                                какой то текст 4
                            </div>
                            <div class="tree__node-children">
                                <div class="tree__node">
                                    <div class="tree__node-symbol">+</div>
                                    <div class="tree__node-content">
                                        <div class="tree__node-text">
                                            какой то текст 5
                                        </div>
                                        <div class="tree__node-children">
                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="tree__node">
            <div class="tree__node-symbol">+</div>
            <div class="tree__node-content">
                <div class="tree__node-text">
                    какой то текст 6
                </div>
                <div class="tree__node-children">
    
                </div>
            </div>
    </div>
    `
}